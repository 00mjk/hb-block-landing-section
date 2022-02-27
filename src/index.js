/**
 * Import WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { help } from '@wordpress/icons';
import {
	BlockControls,
	useBlockProps,
	RichText,
    AlignmentToolbar,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	Button,
	SelectControl,
	PanelBody,
	PanelRow,
} from '@wordpress/components';
import { 
	useEffect, 
	useRef, 
	useState 
} from '@wordpress/element';

/**
 * Import local Styles.
 */
 import './style.scss';
 import './editor.scss';
 
 /**
  * Import local Icons.
  */
 import {
	 IconSettingsCSSGridTracksLR,
	 IconSettingsAspectRatioSquare,
	 IconSettingsAspectRatioWide,
	 IconSettingsAspectRatioUltrawide,
	 IconSettingsCSSGridTrackL,
	 IconSettingsCSSGridTrackR,
 } from '../svg/icons.js';

/**
 * Register the block "hb/landing-section".
 */
registerBlockType( 'hb/landing-section', {

	// Handle the editor block rendering
	edit: ( { attributes, setAttributes, clientId, isSelected } ) => {

		const blockProps = useBlockProps.save( {
			className: 'hb__landingSection',
		} );

		const {
			gridColBoth,
			gridColStart,
			gridColEnd,
			alignment,
		} = attributes;

		/**
		 * Vars used as a temp store for new attribute values.
		 *
		 * New attribute values are populated into these vars
		 * before passings to 'setAttributes'. When reading attributes
		 * that were set in the same function, often the values weren't
		 * updated in time for the next line to pull a value from. This
		 * behaviour is expected according to React docs for performance
		 * reasons.
		 *
		 */
		let newGridColBoth,
			newGridColStart,
			newGridColEnd;

		/**
		 * Test if the start/end selectControls are same.
		 *
		 * If the individual start/end control settings are changed,
		 * the common control which set both at the same time will
		 * reflect an untrue state. Therefore, this function tests
		 * those settings to get a value for the common control:
		 *     - start/end match = return grid position
		 *     - start/end do not match = return false
		 * This value is then used to set the attribute and display
		 * a relevant label in the common selectControl.
		 *
		 */
		const getNewGridColBoth = () => {
			newGridColBoth =
				newGridColStart.split( '-' )[ 0 ] ==
				newGridColEnd.split( '-' )[ 0 ]
					? newGridColStart.split( '-' )[ 0 ]
					: false;
			return newGridColBoth;
		};

		/**
		 * Set all grid-column block attributes.
		 *
		 * This function is called by each selectControl function
		 * every time a setting is changed. All attributes are passed
		 * concurrently in a single call to prevent unnecessary
		 * re-renders.
		 *
		 */
		const setGridAttrs = ( start, end, both ) => {
			setAttributes( {
				gridColStart: start,
				gridColEnd: end,
				gridColBoth: both
			} );
		};

		/**
		 * Handle 'grid-column-start' selectControl onChange.
		 *
		 * This function is called each time the 'start'
		 * selectControl setting is changed. It retrieves new
		 * values for all variables then passes them to the
		 * setGridAttrs function.
		 *
		 */
		const onChangeGridColStart = ( value ) => {
			newGridColStart = value;
			newGridColEnd = gridColEnd;
			newGridColBoth = getNewGridColBoth();
			setGridAttrs(
				newGridColStart,
				newGridColEnd,
				newGridColBoth
			);
		};

		/**
		 * Handle 'grid-column-end' selectControl onChange.
		 *
		 * This function is called each time the 'end'
		 * selectControl setting is changed. It retrieves new
		 * values for all variables then passes them to the
		 * setGridAttrs function.
		 *
		 */
		const onChangeGridColEnd = ( value ) => {
			newGridColEnd = value;
			newGridColStart = gridColStart;
			newGridColBoth = getNewGridColBoth();
			setGridAttrs(
				newGridColStart,
				newGridColEnd,
				newGridColBoth,
			);
		};

		/**
		 * Handle the 'common' 'grid-column' selectControl onChange.
		 *
		 * This function is called each time the 'start'
		 * selectControl setting is changed. It retrieves new
		 * values for all variables then passes them to the
		 * setGridAttrs function.
		 *
		 */
		const onChangeGridColBoth = ( value ) => {
			newGridColStart = value + '-l';
			newGridColEnd = value + '-r';
			newGridColBoth = value;
			setGridAttrs(
				newGridColStart,
				newGridColEnd,
				newGridColBoth,
			);
		};

		/**
		 * Handle the alignment onChange.
		 *
		 * This function is called each time the 'alignment'
		 * toolbar setting is changed. It updates the value of
		 * attribute.alignment.
		 *
		 */
        const onChangeAlignment = ( newAlignment ) => {
			value = ( newAlignment === undefined ) ? 'none' : newAlignment;
            setAttributes( {
                alignment: value,
            } );
        };

		/**
		 * Build options for the select controls.
		 *
		 * Three variations of the settings are produced:
		 *     - optionsStart = start selectControl.
		 *     - optionsEnd = end selectControl.
		 *     - optionsExtended = common selectControl.
		 * 'Start and 'End add suffixes relevant to the CSS class
		 * names (which also match grid column track names) and the
		 * extended options are for the common control. These
		 * options have no suffix as they are 'start'/'end' agnostic,
		 * and also include an added option of 'Custom' (value='false').
		 * This option is not selectable by the user, but is displayed
		 * when the 'start'/'end' selectControl values do not match,
		 * ergo, a 'Custom' configuration.
		 */
		const options = ( position ) => [
				{ label: '1:1 Square', value: 'oneone' + position },
				{ label: '3:2 Wide', value: 'threetwo' + position },
				{ label: '16:9 Cinema', value: 'sixteennine' + position },
				{ label: 'Full Width', value: 'full' + position },
			]
		const optionsStart = options( '-l' )
		const optionsEnd = options( '-r' )
		const optionsExtended = [
				...options( '' ),
				{ label: 'Custom', value: false, disabled: true },
			];

		/**
		 * Build editor block visual aid.
		 *
		 * This array of divs populate the grid to provide a visual
		 * representation of the grid layout. This should only be
		 * displayed when the block is selected.
		 */
		const BorderDivs = () => {
			const numbers = [ 1, 2, 3, 4, 5, 6, 7 ];
			const divs = numbers.map( ( number ) => (
				<div
					style={ { gridColumn: number + '/ span 1' } }
					className="hb__outline"
					key={ number.toString() }
				></div>
			) );
			return <>{ divs }</>;
		};

		// Build JSX block for the editor
		return (
			<>

				{isSelected && (
					<BlockControls key="controls">
                        <AlignmentToolbar
                            value={ attributes.alignment }
                            onChange={ onChangeAlignment }
                        />
					</BlockControls>
				)}

				<section { ...blockProps }>
					{ isSelected && <BorderDivs /> }

					{isSelected && (
						<div
							className="hb__landingSection_content hb__editorBorder"
							style={{

								gridColumnStart: gridColStart,
								gridColumnEnd: gridColEnd,
							}}>
							<InnerBlocks />
						</div>
					)}

					{!isSelected && (
						<div
							className="hb__landingSection_content"
							style={{
								gridColumnStart: gridColStart,
								gridColumnEnd: gridColEnd,
							}}>
							<InnerBlocks />
						</div>
					)}

					<div className="hb__landingSection_backdrop">
						<InnerBlocks allowedBlocks={ 'core/image' } />
					</div>
				</section>

				<InspectorControls>
					<PanelBody
						title={ __( 'Width and Position' ) }
						initialOpen={ true }
					>
						<PanelRow>
							<IconSettingsCSSGridTracksLR />
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="gridColumn"
								labelPosition="Left"
								title="gridColumn"
								value={ gridColBoth }
								options={ optionsExtended }
								onChange={ ( value ) =>
									onChangeGridColBoth( value )
								}
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="gridColumnStart"
								labelPosition="left"
								title="gridColumnStart"
								value={ gridColStart }
								options={ optionsStart }
								onChange={ ( value ) =>
									onChangeGridColStart( value )
								}
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="gridColumnEnd"
								labelPosition="left"
								title="gridColumnEnd"
								value={ gridColEnd }
								options={ optionsEnd }
								onChange={ ( value ) =>
									onChangeGridColEnd( value )
								}
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
	},//edit


	example: ( { attributes } ) => {

		<section { ...blockProps }>
			<div 
				className="hb__landingSection_content"
				style={{
					gridColumnStart: "oneone-l",
					gridColumnEnd: "oneone-r",
				}}
			>
				<p>
					This is a paragraph demonstrated in the content box. You can
					add any content blocks here and it will be displayed in
					front of the background box.
				</p>
				<InnerBlocks.Content />
			</div>
			<div className="hb__landingSection_backdrop">
				<p>
					I am a paragraph in the background box. You can add any
					content blocks here and they will be displayed behind the
					content box.
				</p>
				<InnerBlocks.Content />
			</div>
		</section>;

	},//example


	// Handle parsing the block into final markup as post content
	save: ( { attributes } ) => {
		// wp attributes === React props
		const {
			gridColStart,
			gridColEnd,
			gridColBoth,
		} = attributes;

		// Add classname to props
		const blockProps = useBlockProps.save( {
			className: 'hb__landingSection',
		} );

		// Build JSX block for front end mark up
		return (
			<section { ...blockProps }>
				<div
					className="hb__landingSection_content"
					style={{
						gridColumnStart: gridColStart,
						gridColumnEnd: gridColEnd,
					}}
				>
					<p>gridColBoth is { gridColBoth }.</p>
					<p>gridColStart is { gridColStart }.</p>
					<p>gridColEnd is { gridColEnd }.</p>
					<InnerBlocks.Content />
				</div>
				<div className="hb__landingSection_backdrop">
					<InnerBlocks.Content />
				</div>
			</section>
		);
	},//save

});
