/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */
import {
  THEME_NAME,
  BUTTON_BLOCK,
  getIconClass,
  colorValueToSlug,
} from '../../helpers';
import classnames from 'classnames';

import {
  InnerBlocks,
  RichText,
  getColorClassName,
  getFontSizeClass,
  useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const CAPTION_BOX_CLASS = 'tab-caption-box';
const DEFAULT_MSG = __( '見出し', THEME_NAME );

const v1 = {
  attributes: {
    content: {
      type: 'string',
      default: DEFAULT_MSG,
    },
    color: {
      type: 'string',
      default: '',
    },
    icon: {
      type: 'string',
      default: '',
    },
  },

  migrate( attributes ) {
    const { content, color, icon } = attributes;

    return {
      content: content,
      icon: icon,
      backgroundColor: undefined,
      customBackgroundColor: undefined,
      textColor: undefined,
      customTextColor: undefined,
      borderColor: colorValueToSlug( color ),
      customBorderColor: undefined,
      fontSize: undefined,
      customFontSize: undefined,
    };
  },

  save( { attributes } ) {
    const { content, color, icon } = attributes;
    const classes = classnames( {
      [ CAPTION_BOX_CLASS ]: true,
      [ `tcb-${ colorValueToSlug( color ) }` ]: !! colorValueToSlug( color ),
      [ 'block-box' ]: true,
    } );
    return (
      <div className={ classes }>
        <div
          className={
            'tab-caption-box-label block-box-label' + getIconClass( icon )
          }
        >
          <span className={ 'tab-caption-box-label-text block-box-label-text' }>
            <RichText.Content value={ content } />
          </span>
        </div>
        <div className="tab-caption-box-content">
          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
};

const v2 = {
  save( props ) {
    const {
      content,
      icon,
      backgroundColor,
      textColor,
      borderColor,
      customBorderColor,
      fontSize,
    } = props.attributes;

    const backgroundClass = getColorClassName(
      'background-color',
      backgroundColor
    );
    const textClass = getColorClassName( 'color', textColor );
    const borderClass = getColorClassName( 'border-color', borderColor );
    const fontSizeClass = getFontSizeClass( fontSize );

    const className = classnames( {
      [ CAPTION_BOX_CLASS ]: true,
      'block-box': true,
      'has-text-color': textColor,
      'has-background': backgroundColor,
      'has-border-color': borderColor || customBorderColor,
      [ textClass ]: textClass,
      [ backgroundClass ]: backgroundClass,
      [ borderClass ]: borderClass,
      [ fontSizeClass ]: fontSizeClass,
    } );
    const blockProps = useBlockProps.save( {
      className: className,
    } );

    return (
      <div { ...blockProps }>
        <div
          className={ classnames(
            'tab-caption-box-label',
            'block-box-label',
            'box-label',
            icon
          ) }
        >
          <span
            className={ classnames(
              'tab-caption-box-label-text',
              'block-box-label-text',
              'box-label-text'
            ) }
          >
            <RichText.Content value={ content } />
          </span>
        </div>
        <div
          className={ classnames(
            'tab-caption-box-content',
            'block-box-content',
            'box-content'
          ) }
        >
          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
};

export default [ v2, v1 ];
