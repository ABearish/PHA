import React from "react";
import { Button, Container, Row, Form } from "react-bootstrap";
import CustomCards from "./CustomCards";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: "",
      end: "",
    };
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  submit(e) {
    e.preventDefault();
    this.props.onUpdateCustom(this.state.start, this.state.end);
  }
  onChange(e, property) {
    this.setState({
      [property]: e.target.value,
    });
  }
  render() {
    if (!this.props.custom.length) {
      return (
        <Container>
          <form onSubmit={this.submit}>
            <Form.Row className="align-items-center">
              <label htmlFor="start">Start date:</label>
              <input
                type="date"
                id="start"
                name="start"
                value={this.state.start}
                min="2022-01-01"
                max="2022-12-31"
                required={true}
                onChange={(e) => {
                  this.onChange(e, "start");
                }}
              />
              <label htmlFor="end">End date:</label>
              <input
                type="date"
                id="end"
                name="end"
                value={this.state.end}
                min="2022-01-01"
                max="2022-12-31"
                required={true}
                onChange={(e) => {
                  this.onChange(e, "end");
                }}
              />

              <Button type="submit">Submit</Button>
            </Form.Row>
          </form>
        </Container>
      );
    } else {
      return (
        <Container>
          <Button
            onClick={() => {
              this.props.onClearCustom();
            }}
          >
            Clear
          </Button>
          <Row>
            {this.props.custom.map((pha, i) => {
              return (
                <CustomCards
                  pha={pha}
                  key={i}
                  onUpdateTracker={this.props.onUpdateTracker}
                />
              );
            })}
          </Row>
        </Container>
      );
    }
  }
}
export default DatePicker;
