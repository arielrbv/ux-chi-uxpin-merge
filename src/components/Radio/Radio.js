import * as PropTypes from 'prop-types';
import * as React from 'react';
import { uuid4 } from '../../utils/utils';
import {
  BUTTON_CLASSES,
  ICON_CLASS,
  LABEL_CLASSES,
  STAT_CLASSES,
} from '../../constants/classes';

/* eslint-disable */
/**
 * @uxpincomponent
 */
export default class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: uuid4() };
  }

  render() {
    const radiosToRender = [];

    function selectRadio(radioLabel) {
      const input = radioLabel.parentNode.querySelector('input');
      const otherInputsInFieldset = radioLabel.parentNode.parentNode.parentNode.querySelectorAll('input');

      otherInputsInFieldset.forEach(input => {
        input.checked = false;
      });

      if (input) {
        input.checked = true;
      }
    }

    Array(11).fill()
      .forEach((_, i) => {
        if (this.props[`option${i}`]) {
          const uuid = `${this.state.id}-${i}`;
          const inline = this.props.inline ? '-inline' : '';

          radiosToRender.push(
            <div className={`chi-form__item ${inline}`} key={`radio-${i}`}>
              <div className="chi-radio">
                <input className="chi-radio__input" type="radio" name={`radios-${uuid}`} id={uuid}
                  checked={i === this.props.selectedOption} disabled={this.props[`disabled${i}`]}
                  onChange={() => {
                  }} />
                <label onClick={(e) => {
                  selectRadio(e.target, uuid);
                  if (this.props[`select${i}`]) {
                    this.props[`select${i}`]();
                  }
                }} className="chi-radio__label" htmlFor={uuid}>{this.props[`option${i}`]}</label>
              </div>
            </div>
          );
        }
      });

    const required = <abbr className={`${LABEL_CLASSES.REQUIRED}`} title="Required field">*</abbr>;
    const optional = <abbr className={`${LABEL_CLASSES.OPTIONAL}`} title="Optional field">(optional)</abbr>;
    let message = '';

    if (this.props.required && this.props.required === 'required') {
      message = required;
    } else if (this.props.required && this.props.required === 'optional') {
      message = optional;
    }

    const info = this.props.info ?
      <div className={`${STAT_CLASSES.TITLE_HELP}`}
      onClick={this.props.clickInfo}
      onMouseEnter={this.props.mouseOverInfo}
      onMouseLeave={this.props.mouseLeaveInfo}>
        <button className={`${BUTTON_CLASSES.BUTTON} -icon -xs -flat`} aria-label="Help">
          <i className={`${ICON_CLASS} icon-circle-info-outline -icon--primary`}></i>
        </button>
      </div> : '';

    const fieldLabel = this.props.fieldLabel ?
      <div className={`${LABEL_CLASSES.LABEL}`}>
        {this.props.fieldLabel}
        {message}
        {info}
      </div> : '';
    return (
      <fieldset>
        {fieldLabel}
        {radiosToRender}
      </fieldset>
    );
  }
}

Radio.propTypes = {
  fieldLabel: PropTypes.string,
  required: PropTypes.oneOf(['none', 'required', 'optional']),
  inline: PropTypes.bool,
  selectedOption: PropTypes.oneOf(['None', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  info: PropTypes.bool,
  clickInfo: PropTypes.func,
  mouseOverInfo: PropTypes.func,
  mouseLeaveInfo: PropTypes.func,
  option1: PropTypes.string,
  disabled1: PropTypes.bool,
  option2: PropTypes.string,
  disabled2: PropTypes.bool,
  option3: PropTypes.string,
  disabled3: PropTypes.bool,
  option4: PropTypes.string,
  disabled4: PropTypes.bool,
  option5: PropTypes.string,
  disabled5: PropTypes.bool,
  option6: PropTypes.string,
  disabled6: PropTypes.bool,
  option7: PropTypes.string,
  disabled7: PropTypes.bool,
  option8: PropTypes.string,
  disabled8: PropTypes.bool,
  option9: PropTypes.string,
  disabled9: PropTypes.bool,
  option10: PropTypes.string,
  disabled10: PropTypes.bool,
  select1: PropTypes.func,
  select2: PropTypes.func,
  select3: PropTypes.func,
  select4: PropTypes.func,
  select5: PropTypes.func,
  select6: PropTypes.func,
  select7: PropTypes.func,
  select8: PropTypes.func,
  select9: PropTypes.func,
  select10: PropTypes.func,
};
/* eslint-enable */

Radio.defaultProps = {
  fieldLabel: 'Field Label',
  option1: 'Option 1',
  option2: 'Option 2',
  option3: 'Option 3',
  selectedOption: 1,
  required: 'none',
  info: false,
};
