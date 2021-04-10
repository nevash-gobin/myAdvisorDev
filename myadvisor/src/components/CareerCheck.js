import React, { Component } from 'react'

class CareerCheck extends Component {
    render() {
        return (
            <div className="career-row">{
                Array.from({ length: this.props.careers.length }, (_, k) => (
                    <tr class="d-flex career-row">
                        <td class="col-3 name-cell form-check">
                            <input type="checkbox" class="form-check-input career-check" id={`careerCheck${k}`} value={this.props.careers[k].id} onChange={this.props.onChange}></input>
                            <label className="form-check-label career-label" for={`careerCheck${k}`}>{this.props.careers[k].name}</label>
                        </td>
                        <td class="col-9 desc-cell">{this.props.careers[k].description}</td>
                    </tr>
                ))
            }
            </div>
        )
    }

}

export default CareerCheck