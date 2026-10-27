<?php
/**
 * Plugin Name: TankQ CMS
 * Description: Content types, editing fields and the live-update webhook for the TankQ Next.js site. Requires the free "Advanced Custom Fields" plugin.
 * Version: 1.0.0
 * Requires PHP: 8.0
 *
 * Field names and slot counts here are read by src/lib/wp/catalogue.ts and
 * written by scripts/migrate-to-wp.ts. Change one side and the others have to
 * follow.
 *
 * Optional wp-config.php constants:
 *   TANKQ_REVALIDATE_URL    e.g. https://www.tankq-solution.com/api/revalidate
 *   TANKQ_REVALIDATE_SECRET same value as REVALIDATE_SECRET on the Next.js side
 *   TANKQ_SITE_URL          public site; the CMS front page redirects there
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const TQ_PRODUCT_IMAGE_SLOTS = 12;
const TQ_PRODUCT_SPEC_SLOTS  = 5;
const TQ_PROJECT_IMAGE_SLOTS = 4;
const TQ_SERVICE_POINT_SLOTS = 5;

/** Post type => [ REST base, singular label, plural label, dashicon ]. */
function tq_post_types(): array {
	return array(
		'tq_product'     => array( 'tq-products', 'Product', 'Products', 'dashicons-archive' ),
		'tq_category'    => array( 'tq-categories', 'Product category', 'Product categories', 'dashicons-category' ),
		'tq_project'     => array( 'tq-projects', 'Project', 'Projects', 'dashicons-portfolio' ),
		'tq_tank_type'   => array( 'tq-tank-types', 'Project tank type', 'Project tank types', 'dashicons-tag' ),
		'tq_application' => array( 'tq-applications', 'Project application', 'Project applications', 'dashicons-tag' ),
		'tq_service'     => array( 'tq-services', 'Service', 'Services', 'dashicons-hammer' ),
	);
}

add_action(
	'init',
	static function (): void {
		foreach ( tq_post_types() as $type => list( $rest_base, $singular, $plural, $icon ) ) {
			register_post_type(
				$type,
				array(
					'labels'              => array(
						'name'          => $plural,
						'singular_name' => $singular,
						'add_new_item'  => "Add $singular",
						'edit_item'     => "Edit $singular",
					),
					// No public pages: the Next.js site renders everything.
					'public'              => false,
					'show_ui'             => true,
					'show_in_menu'        => true,
					'show_in_rest'        => true,
					'rest_base'           => $rest_base,
					'menu_icon'           => $icon,
					'supports'            => array( 'title' ),
					'has_archive'         => false,
					'exclude_from_search' => true,
				)
			);
		}
	}
);

/* ---------------------------------------------------------------- fields */

function tq_text( string $name, string $label, array $extra = array() ): array {
	return array_merge(
		array(
			'key'   => "field_tq_$name",
			'label' => $label,
			'name'  => $name,
			'type'  => 'text',
		),
		$extra
	);
}

/** A Thai and an English text field side by side. */
function tq_pair( string $name, string $label, string $type = 'text', bool $required = false ): array {
	$extra = array(
		'type'     => $type,
		'required' => $required ? 1 : 0,
		'wrapper'  => array( 'width' => '50' ),
	);

	if ( 'textarea' === $type ) {
		$extra['rows'] = 6;
	}

	return array(
		tq_text( "{$name}_th", "$label (Thai)", $extra ),
		tq_text( "{$name}_en", "$label (English)", $extra ),
	);
}

function tq_image( string $name, string $label ): array {
	return array(
		'key'           => "field_tq_$name",
		'label'         => $label,
		'name'          => $name,
		'type'          => 'image',
		'return_format' => 'array',
		'preview_size'  => 'medium',
		'library'       => 'all',
		'wrapper'       => array( 'width' => '25' ),
	);
}

function tq_number( string $name, string $label, string $instructions = '' ): array {
	return array(
		'key'          => "field_tq_$name",
		'label'        => $label,
		'name'         => $name,
		'type'         => 'number',
		'instructions' => $instructions,
		'wrapper'      => array( 'width' => '25' ),
	);
}

function tq_flag( string $name, string $label, string $instructions = '' ): array {
	return array(
		'key'          => "field_tq_$name",
		'label'        => $label,
		'name'         => $name,
		'type'         => 'true_false',
		'ui'           => 1,
		'instructions' => $instructions,
		'wrapper'      => array( 'width' => '25' ),
	);
}

/** A dropdown of another content type, stored as that post's id. */
function tq_relation( string $name, string $label, string $post_type ): array {
	return array(
		'key'           => "field_tq_$name",
		'label'         => $label,
		'name'          => $name,
		'type'          => 'post_object',
		'post_type'     => array( $post_type ),
		'return_format' => 'id',
		'allow_null'    => 0,
		'required'      => 1,
		'wrapper'       => array( 'width' => '50' ),
	);
}

function tq_note( string $text ): array {
	return array(
		'key'     => 'field_tq_note_' . md5( $text ),
		'label'   => 'Note',
		'name'    => '',
		'type'    => 'message',
		'message' => $text,
	);
}

function tq_group( string $post_type, array $fields ): array {
	return array(
		'key'          => "group_$post_type",
		'title'        => 'Content',
		'fields'       => $fields,
		'location'     => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => $post_type ) ) ),
		'show_in_rest' => 1,
		'style'        => 'default',
	);
}

const TQ_SLUG_NOTE = 'The title above is only an internal label, and it sets the web address ID. Write it in English (for example "FRP Water Tank"). The text visitors see is in the Thai and English fields below.';

function tq_product_fields(): array {
	$fields = array_merge(
		array( tq_note( TQ_SLUG_NOTE ) ),
		tq_pair( 'title', 'Name', 'text', true ),
		tq_pair( 'description', 'Description', 'textarea', true ),
		array(
			tq_relation( 'category', 'Category', 'tq_category' ),
			tq_flag( 'featured', 'Show on home page' ),
			tq_number( 'order', 'Order', 'Lower numbers come first.' ),
		)
	);

	$icons = array(
		''                    => 'No icon',
		'material'            => 'Material',
		'waterStorage'        => 'Water storage',
		'wasteWaterTreatment' => 'Wastewater treatment',
		'greaseTrap'          => 'Grease trap',
		'brand'               => 'Brand',
	);

	for ( $i = 1; $i <= TQ_PRODUCT_SPEC_SLOTS; $i++ ) {
		$fields = array_merge(
			$fields,
			tq_pair( "spec_$i", "Fact $i" ),
			array(
				array(
					'key'     => "field_tq_spec_{$i}_icon",
					'label'   => "Fact $i icon",
					'name'    => "spec_{$i}_icon",
					'type'    => 'select',
					'choices' => $icons,
					'wrapper' => array( 'width' => '50' ),
				),
			)
		);
	}

	for ( $i = 1; $i <= TQ_PRODUCT_IMAGE_SLOTS; $i++ ) {
		$fields[] = tq_image( "image_$i", $i === 1 ? 'Cover image' : "Image $i" );
	}

	return $fields;
}

function tq_project_fields(): array {
	$fields = array_merge(
		array( tq_note( TQ_SLUG_NOTE ) ),
		tq_pair( 'title', 'Title', 'text', true ),
		tq_pair( 'industry', 'Industry' ),
		tq_pair( 'province', 'Province' ),
		array(
			tq_number( 'year', 'Year' ),
			tq_flag( 'featured', 'Show on home page' ),
			tq_number( 'order', 'Order', 'Lower numbers come first.' ),
			tq_relation( 'tank_type', 'Tank type', 'tq_tank_type' ),
			tq_relation( 'application', 'Application', 'tq_application' ),
		),
		tq_pair( 'problem', 'Problem', 'textarea' ),
		tq_pair( 'solution', 'Solution', 'textarea' ),
		tq_pair( 'result', 'Result', 'textarea' )
	);

	for ( $i = 1; $i <= TQ_PROJECT_IMAGE_SLOTS; $i++ ) {
		$fields[] = tq_image( "image_$i", $i === 1 ? 'Cover image' : "Image $i" );
	}

	return $fields;
}

function tq_service_fields(): array {
	$fields = array_merge(
		array( tq_note( TQ_SLUG_NOTE ) ),
		tq_pair( 'title', 'Title', 'text', true ),
		tq_pair( 'description', 'Short description', 'textarea' ),
		array( tq_number( 'order', 'Order', 'Lower numbers come first.' ) )
	);

	for ( $i = 1; $i <= TQ_SERVICE_POINT_SLOTS; $i++ ) {
		$fields = array_merge( $fields, tq_pair( "point_$i", "Highlight $i" ) );
	}

	$fields[] = tq_image( 'image', 'Photo' );

	return array_merge( $fields, tq_pair( 'image_alt', 'Photo description' ) );
}

function tq_label_fields(): array {
	return array_merge(
		array( tq_note( TQ_SLUG_NOTE ) ),
		tq_pair( 'title', 'Name', 'text', true ),
		array( tq_number( 'order', 'Order', 'Lower numbers come first.' ) )
	);
}

add_action(
	'acf/init',
	static function (): void {
		if ( ! function_exists( 'acf_add_local_field_group' ) ) {
			return;
		}

		acf_add_local_field_group( tq_group( 'tq_product', tq_product_fields() ) );
		acf_add_local_field_group( tq_group( 'tq_project', tq_project_fields() ) );
		acf_add_local_field_group( tq_group( 'tq_service', tq_service_fields() ) );

		foreach ( array( 'tq_category', 'tq_tank_type', 'tq_application' ) as $type ) {
			acf_add_local_field_group( tq_group( $type, tq_label_fields() ) );
		}
	}
);

add_action(
	'admin_notices',
	static function (): void {
		if ( function_exists( 'acf_add_local_field_group' ) || ! current_user_can( 'activate_plugins' ) ) {
			return;
		}

		echo '<div class="notice notice-error"><p><strong>TankQ CMS</strong> needs the free "Advanced Custom Fields" plugin. Install and activate it.</p></div>';
	}
);

/* --------------------------------------------------------------- webhook */

/** Tells the Next.js site that content changed, so it refetches. */
function tq_notify_site(): void {
	if ( ! defined( 'TANKQ_REVALIDATE_URL' ) || ! defined( 'TANKQ_REVALIDATE_SECRET' ) ) {
		return;
	}

	wp_remote_post(
		TANKQ_REVALIDATE_URL,
		array(
			'timeout'  => 5,
			'blocking' => false,
			'headers'  => array( 'x-revalidate-secret' => TANKQ_REVALIDATE_SECRET ),
		)
	);
}

/**
 * Runs late (priority 99) so ACF has already saved its fields: the site must
 * not refetch halfway through a save and cache the old values.
 */
add_action(
	'save_post',
	static function ( int $post_id, WP_Post $post ): void {
		if ( isset( tq_post_types()[ $post->post_type ] ) && ! wp_is_post_revision( $post_id ) ) {
			tq_notify_site();
		}
	},
	99,
	2
);

foreach ( array( 'trashed_post', 'untrashed_post', 'deleted_post' ) as $hook ) {
	add_action(
		$hook,
		static function ( int $post_id ): void {
			if ( isset( tq_post_types()[ get_post_type( $post_id ) ] ) ) {
				tq_notify_site();
			}
		}
	);
}

/* ----------------------------------------------------------- privacy */

// The CMS has no public pages. Send visitors to the real site and keep search
// engines off the CMS host.
add_action(
	'template_redirect',
	static function (): void {
		if ( defined( 'TANKQ_SITE_URL' ) && ! is_user_logged_in() ) {
			wp_redirect( TANKQ_SITE_URL, 301 );
			exit;
		}
	}
);

add_action(
	'send_headers',
	static function (): void {
		header( 'X-Robots-Tag: noindex, nofollow' );
	}
);
