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
 * Import WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { help } from '@wordpress/icons';
import {
	BlockControls,
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	useSetting
} from '@wordpress/block-editor';
import {
	Button,
	SelectControl,
	PanelBody,
	PanelRow,
} from '@wordpress/components';


/**
 * Register the block "hb/landing-section".
 */
registerBlockType( 'hb/landing-section', {

	// Handle the editor block rendering
	edit: ( { attributes, setAttributes, isSelected } ) => {

		const blockProps = useBlockProps.save( {
			className: 'hb__landingSection',
		} );

		const {
			contentDivClasses,
			selectControlBoth,
			selectControlStart,
			selectControlEnd,
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
		let newContentDivClasses,
			newSelectControlBoth,
			newSelectControlStart,
			newSelectControlEnd;

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
		const getNewSelectControlBoth = function () {
			newSelectControlBoth =
				newSelectControlStart.split( '-' )[ 0 ] ==
				newSelectControlEnd.split( '-' )[ 0 ]
					? newSelectControlStart.split( '-' )[ 0 ]
					: false;
			return newSelectControlBoth;
		};

		/**
		 * Build new classes string.
		 *
		 * This function is called each time a selectControl setting is
		 * changed. It simply concatenates a string from the given 'new'
		 * variables in a legal CSS class format.
		 *
		 */
		const getNewContentDivClasses = function () {
			newContentDivClasses =
				'hb__landingSection_content ' +
				newSelectControlStart +
				' ' +
				newSelectControlEnd;
			return newContentDivClasses;
		};

		/**
		 * Set all block attributes.
		 *
		 * This function is called by each selectControl function
		 * every time a setting is changed. All attributes are passed
		 * concurrently in a single call to prevent unnecessary
		 * re-renders.
		 *
		 */
		const setAllAttrs = function ( start, end, both, classes ) {
			setAttributes( {
				selectControlStart: start,
				selectControlEnd: end,
				selectControlBoth: both,
				contentDivClasses: classes,
			} );
		};

		/**
		 * Handle 'grid-column-start' selectControl onChange.
		 *
		 * This function is called each time the 'start'
		 * selectControl setting is changed. It retrieves new
		 * values for all variables then passes them to the
		 * setAllAttrs function.
		 *
		 */
		const onChangeSelectControlStart = function ( value ) {
			newSelectControlStart = value;
			newSelectControlEnd = selectControlEnd;
			newSelectControlBoth = getNewSelectControlBoth();
			newContentDivClasses = getNewContentDivClasses();
			setAllAttrs(
				newSelectControlStart,
				newSelectControlEnd,
				newSelectControlBoth,
				newContentDivClasses
			);
		};

		/**
		 * Handle 'grid-column-end' selectControl onChange.
		 *
		 * This function is called each time the 'end'
		 * selectControl setting is changed. It retrieves new
		 * values for all variables then passes them to the
		 * setAllAttrs function.
		 *
		 */
		const onChangeSelectControlEnd = function ( value ) {
			newSelectControlEnd = value;
			newSelectControlStart = selectControlStart;
			newSelectControlBoth = getNewSelectControlBoth();
			newContentDivClasses = getNewContentDivClasses();
			setAllAttrs(
				newSelectControlStart,
				newSelectControlEnd,
				newSelectControlBoth,
				newContentDivClasses
			);
		};

		/**
		 * Handle the 'common' 'grid-column' selectControl onChange.
		 *
		 * This function is called each time the 'start'
		 * selectControl setting is changed. It retrieves new
		 * values for all variables then passes them to the
		 * setAllAttrs function.
		 *
		 */
		const onChangeSelectControlBoth = function ( value ) {
			newSelectControlStart = value + '-l';
			newSelectControlEnd = value + '-r';
			newSelectControlBoth = value;
			newContentDivClasses = getNewContentDivClasses();
			setAllAttrs(
				newSelectControlStart,
				newSelectControlEnd,
				newSelectControlBoth,
				newContentDivClasses
			);
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
			],
			optionsStart = options( '-l' ),
			optionsEnd = options( '-r' ),
			optionsExtended = [
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
		const BorderDivs = function () {
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
				<section { ...blockProps }>
					{ isSelected && <BorderDivs /> }

					<div className={ contentDivClasses }>
						<p>This is the hb__landingSection block.</p>
						<InnerBlocks />
					</div>
					<div className="hb__landingSection_backdrop">
						<InnerBlocks allowedBlocks={ 'core/image' } />
					</div>
				</section>

				<BlockControls>
					<SelectControl
							label="gridColumn"
							labelPosition="Left"
							title="gridColumn"
							value={ selectControlBoth }
							options={ optionsExtended }
							onChange={ ( value ) =>
								onChangeSelectControlBoth( value )
							}
					/>
				</BlockControls>

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
								value={ selectControlBoth }
								options={ optionsExtended }
								onChange={ ( value ) =>
									onChangeSelectControlBoth( value )
								}
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="gridColumnStart"
								labelPosition="left"
								title="gridColumnStart"
								value={ selectControlStart }
								options={ optionsStart }
								onChange={ ( value ) =>
									onChangeSelectControlStart( value )
								}
							/>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label="gridColumnEnd"
								labelPosition="left"
								title="gridColumnEnd"
								value={ selectControlEnd }
								options={ optionsEnd }
								onChange={ ( value ) =>
									onChangeSelectControlEnd( value )
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
			<div className={ 'hb__landingSection_content oneone-l oneone-r' }>
				<p>
					This is a paragraph demonstrated in the content box. You can
					add any content blocks here and it will be displayed in
					front of the background box.
				</p>
			</div>
			<div className="hb__landingSection_backdrop">
				<p>
					I am a paragraph in the background box. You can add any
					content blocks here and they will be displayed behind the
					content box.
				</p>
			</div>
		</section>;

	},//example

	// Handle parsing the block into final markup as post content
	save: ( { attributes } ) => {
		// wp attributes === React props
		const {
			contentDivClasses,
			selectControlStart,
			selectControlEnd,
			selectControlBoth,
		} = attributes;

		// Add classname to props
		const blockProps = useBlockProps.save( {
			className: 'hb__landingSection',
		} );

		// Build JSX block for front end mark up
		return (
			<section { ...blockProps }>
				<div className={ contentDivClasses }>
					<p>selectControlBoth is { selectControlBoth }.</p>
					<p>selectControlStart is { selectControlStart }.</p>
					<p>selectControlEnd is { selectControlEnd }.</p>
					<InnerBlocks.Content />
				</div>
				<div className="hb__landingSection_backdrop">
					<InnerBlocks.Content />
				</div>
			</section>
		);
	},//save
} );
