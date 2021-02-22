import React, { Component } from 'react'

class CareerCheck extends Component {
    render() {
        return (
            <div>{
                Array.from({ length: this.props.count }, (_, k) => (
                    //<li className={`progress-circle ${this.props.progressState[k]}`}></li>
                    <div class="form-check career-check">
                        <input type="checkbox" class="form-check-input" id={`careerCheck${k}`}></input>
                        <label class="form-check-label" for={`careerCheck${k}`}>{this.props.career[k]}</label>
                     </div>
                ))
            }
            </div>
        )
    }

}

export default CareerCheck