/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { help } from '@wordpress/icons';
import { 
	useBlockProps,
	InnerBlocks,
	InspectorControls
 } from '@wordpress/block-editor';
import {
	Button,
	DropdownMenu,
	PanelBody,
	PanelRow
} from '@wordpress/components';


/* Local Styles */
import './style.scss';
import './editor.scss';

/* Local Icons */
import {
	sectionAR,
	sectionAR11,
	sectionAR32,
	sectionAR169,
	sectionARLH,
	sectionARRH 
} from '../svg/icons.js';

/* Register the block type */
registerBlockType( 'hb/landing-section', {

	/* Handle the editor block rendering */
	edit: ( { attributes } ) => {

		/* Add classname to props */
        const blockProps = useBlockProps( {
            className: 'hb__landingSection',
        } );

		/* Define the WP dependencies */
		const { InspectorControls } = wp.blockEditor;
		const { PanelBody } = wp.components;
		const { PanelRow } = wp.components;

		/* Handle property updates */
		const onChangeGridColumnStart = ( value ) => {
			blockProps.setAttributes( { gridColumnStart: value } );
		};
		const onChangeGridColumnEnd = ( value ) => {
			blockProps.setAttributes( { gridColumnEnd: value } );
		};

		console.log({...blockProps});

		/* Build JSX block for the editor */
		return (
			<>

				<section { ...blockProps }>

					<div className="hb__landingSection_content" style={{ gridColumnStart: attributes.gridColumnStart , gridColumnEnd: attributes.gridColumnEnd, minHeight: attributes.minHeight}}>

						<p>gridColumnStart is { attributes.gridColumnStart }.</p>
						<p>gridColumnEnd is { attributes.gridColumnEnd }.</p>
						<InnerBlocks />

					</div>

					<div className="hb__landingSection_backdrop">
					</div>

				</section>

				<InspectorControls>
					<PanelBody
						title={__('Width and Position')}
						initialOpen={true}
					>
						<PanelRow>
							<DropdownMenu
								icon={ sectionAR }
								label="Choose the aspect ratio"
								title="Aspect Ratio"
								isCollapsed
								controls={ [
									{ icon: sectionAR11, title: '1:1', isActive: true,},
									{ icon: sectionAR32, title: '3:2', },
									{ icon: sectionAR169, title: '16:9', },
								] }
							/>
						</PanelRow>
						<PanelRow>
							<DropdownMenu
								icon={ sectionARLH }
								label="Left-side track position"
								isCollapsed
								onChange={onChangeGridColumnStart}
								controls={ [
									{ icon: sectionAR11, title: '1:1', isActive: true, value: 'oneone-l'},
									{ icon: sectionAR32, title: '3:2', value: 'threetwo-l' },
									{ icon: sectionAR169, title: '16:9', value: 'sixteennine-l' },
								] }
							/>
							<DropdownMenu
								icon={ sectionARRH }
								label="Right-side track position"
								isCollapsed
								controls={ [
									{ icon: sectionAR11, title: '1:1', isActive: true,},
									{ icon: sectionAR32, title: '3:2' },
									{ icon: sectionAR169, title: '16:9' },
								] }
							/>
						</PanelRow>
						<PanelRow>
							<Button 
								icon={ help }
								label="Help"
								className="hb_inspectorHelpButton"
							>
								Help
							</Button>
						</PanelRow>
				    </PanelBody>
				</InspectorControls>

			</>

		);
	},

	/* Handle parsing the block into final markup as post content */
	save: ( attributes ) => {

		/* Add classname to props */
        const blockProps = useBlockProps.save( {
            className: 'hb__landingSection',
        } );

		/* Build JSX block for front end mark up */
		return (
				<section { ...blockProps }>

					<div className="hb__landingSection_content" >

						<p>gridColumnStart is { attributes.gridColumnStart }.</p>
						<p>gridColumnEnd is { attributes.gridColumnEnd }.</p>
						<InnerBlocks />

					</div>

					<div className="hb__landingSection_backdrop">
					</div>

				</section>

		);
	}
} );