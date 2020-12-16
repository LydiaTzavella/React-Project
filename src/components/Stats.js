import React, { Component } from "react";
import StatsDataService from "../services/stats.services.js";
import { Card, Container, Row } from "react-bootstrap";


class Stats extends Component {
  constructor(props) {
    super(props);
    this.retrieveStats = this.retrieveStats.bind(this);

    this.state = {
      stats: [],
    };
  }

  componentDidMount() {
    this.retrieveStats();
  }

  retrieveStats() {
    StatsDataService.getAll()
      .then((response) => {
        this.setState({
          stats: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

  }

  render() {
    const { stats } = this.state;

    let styles = {
      margin: '1rem',
      marginTop: '30px',
      marginBottom: '30px',
      textAlign: 'center',
      flexDirection: 'row',
      width: '100%',
      flex: 4
    };

    return (
      <Container fluid>
        <Row>
          {stats &&
            stats.map((stats) => (

              <Card body style={styles}>
                <h4 className="card-title" style={{ textTransform: 'uppercase' }}> {stats.title}: <span className="card-text" style={{ fontSize: '18px', color: 'red' }}>{stats.amount}</span></h4>
              </Card>

            ))}
        </Row>
      </Container>
    );
  }
}

export default Stats;
