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
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 */
export default function Edit() {

		const {
			attributes: { gridColumnStart, gridColumnEnd },
			setAttributes,
		} = props;

		const onChangeGridColumnStart = ( value ) => {
			setAttributes( { gridColumnStart: value } );
		};

		const onChangeGridColumnEnd = ( value ) => {
			setAttributes( { gridColumnEnd: value } );
		};


	return (

        <section { ...useBlockProps() }>
            <div className="hbls_content" style='gridRow="{ example.attributes.gridColumnStart }"; gridColumn="{ example.attributes.gridColumnEnd }"' >
                { __(
                    'Landing Section – hello from the editor!',
                    'landing-section'
                ) }
            </div>
            <div className="hbls_backdrop">
            </div>
        </section>

	);
}