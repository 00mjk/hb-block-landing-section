<?php
/**
 * Plugin Name:       Hb Block Landing Section
 * Description:       A full width grid template for landing page sections.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Jefferson Real
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       hb-block-landing-section
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function hb_block_landing_section_init() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'hb_block_landing_section_init' );
