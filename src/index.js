/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import {
	alignCenter,
	alignLeft,
	alignRight,
	more,
	paragraph,
	grid,
	help,
} from '@wordpress/icons';
import {
	SVG,
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarItem,
	DropdownMenu,
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
	edit: ( props ) => {

		const blockProps = useBlockProps();

		const {
			className,
			attributes: { gridColumnStart, gridColumnEnd, clssName },
			setAttributes,
		} = props;

		const onChangeGridColumnStart = ( value ) => {
			setAttributes( { gridColumnStart: value } );
		};

		const onChangeGridColumnEnd = ( value ) => {
			setAttributes( { gridColumnEnd: value } );
		};


		return (
			<>

				<section { ...blockProps } 
					//className={ classnames( blockProps.className, {
					//[ `has-custom-width wp-block-button__width-${ width }` ]: width,
					//[ `has-custom-font-size` ]: blockProps.style.fontSize,
					//} ) }
				>

					<div className="hb__landingSection_content" >

						<p>gridRow is </p>
						<p>gridColumn is </p>

					</div>

					<div className="hb__landingSection_backdrop">
					</div>

				</section>

				{/* id is required for server side rendering */}
				<Toolbar label="Options" id="options-toolbar">
					<ToolbarGroup>
						<ToolbarButton icon={ help } label="Help" />
					</ToolbarGroup>
					<ToolbarGroup>
						<ToolbarItem>
							{ ( toggleProps ) => (
								<DropdownMenu
									hasArrowIndicator
									icon={ sectionAR }
									label="Align"
									controls={ [
										{ icon: sectionAR11, title: '1:1', isActive: true,},
										{ icon: sectionAR32, title: '3:2' },
										{ icon: sectionAR169, title: '16:9'  },
									] }
									toggleProps={ toggleProps }
								/>
							) }
						</ToolbarItem>
					</ToolbarGroup>
					<ToolbarGroup
						icon={ sectionARLH }
						label="Align"
						isCollapsed
						controls={ [
							{ icon: sectionAR11, title: '1:1', isActive: true,},
							{ icon: sectionAR32, title: '3:2' },
							{ icon: sectionAR169, title: '16:9'  },
						] }
					/>
					<ToolbarGroup
						icon={ sectionARRH }
						label="Align"
						isCollapsed
						controls={ [
							{ icon: sectionAR11, title: '1:1', isActive: true,},
							{ icon: sectionAR32, title: '3:2' },
							{ icon: sectionAR169, title: '16:9'  },
						] }
					/>
				</Toolbar>

			</>

		);
	},

	/* Handle parsing the block into final markup as post content */
	save: ( props ) => {
		return (

				<section { ...useBlockProps.save() } >

					<div className="hb__landingSection_content" >

					<p>gridRow is </p>
					<p>gridColumn is </p>

					</div>

					<div className="hb__landingSection_backdrop">
					</div>

				</section>

		);
	}
} );