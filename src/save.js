/**
 * Retrieves the translation of text.
 */
 import { __ } from '@wordpress/i18n';

 /**
  * React hook that is used to mark the block wrapper element.
  * It provides all the necessary props like the class name.
  */
 import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 */
export default function save() {
	return (
		<p { ...useBlockProps.save() }>
			{ __(
				'Hb Block Landing Section – hello from the saved content!',
				'hb-block-landing-section'
			) }
		</p>
	);
}
