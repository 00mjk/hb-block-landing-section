/**
 * Import local Styles.
 */
import './style.scss';
import './editor.scss';

/**
 * Import local Icons.
 */
import { sectionAR, sectionAR11, sectionAR32, sectionAR169, sectionARLH, sectionARRH } from '../svg/icons.js';

/**
 * Import WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { help } from '@wordpress/icons';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { Button, DropdownMenu, PanelBody, PanelRow } from '@wordpress/components';


/**
 * Register the block "hb/landing-section".
 */
registerBlockType( 'hb/landing-section', {

	// Handle the editor block rendering
	edit: ( { attributes, isSelected } ) => {

		// Add custom classname to json properties
        const blockProps = useBlockProps( {
            className: 'hb__landingSection',
        } );

		// Handle property updates
		const onChangeGridColumnStart = ( value ) => {
			blockProps.setAttributes( { gridColumnStart: value } );
		};
		const onChangeGridColumnEnd = ( value ) => {
			blockProps.setAttributes( { gridColumnEnd: value } );
		};

		// Build the editor css grid visual aid
		const BorderDivs = () => {
			const numbers = [1, 2, 3, 4, 5, 6, 7];
			const divs = numbers.map((number) =>
				<div style={{ gridColumn:number + '/ span 1' }}
					 className='hb__outline'
					 key={number.toString()}
				>
				</div>
			);
			return (
				<>{divs}</>
			);
		}

		console.log({...blockProps});

		/* Build JSX block for the editor */
		return (
			<>

				<section { ...blockProps }>

					{ isSelected && (
						<BorderDivs />
					) }


					<div className="hb__landingSection_content" 
						style={{ gridColumnStart: attributes.gridColumnStart,
								 gridColumnEnd: attributes.gridColumnEnd,
								 minHeight: attributes.minHeight
						}}
					>

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
									{ 
										icon: sectionAR11, 
										title: '1:1', 
										isActive: true,
										isDisabled: false,
									},
									{ 
										icon: sectionAR32,
										title: '3:2',
										isDisabled: false,
									},
									{ 
										icon: sectionAR169,
										title: '16:9',
										isDisabled: false,
									},
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
									{ 
										icon: sectionAR11,
										title: '1:1',
										isActive: true,
										isDisabled: false,
										value: 'oneone-l'
									},
									{ 
										icon: sectionAR32,
										title: '3:2',
										isDisabled: false,
										value: 'threetwo-l' 
									},
									{ 
										icon: sectionAR169,
										title: '16:9',
										isDisabled: false,
										value: 'sixteennine-l'
									},
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
								className="hb__inspectorHelpButton"
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