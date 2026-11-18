import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Collapse } from "react-bootstrap";

class PersonList extends Component {
  state = {
    persons: [],
    openDetails: {},
  };

  componentDidMount() {
    axios
      .get("https://randomuser.me/api/?results=10")
      .then((res) => {
        console.log(res.data);
        const persons = res.data.results;
        this.setState({ persons });
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }

  toggleDetails = (uuid) => {
    this.setState((prevState) => ({
      openDetails: {
        ...prevState.openDetails,
        [uuid]: !prevState.openDetails[uuid],
      },
    }));
  };

  render() {
    const { persons, openDetails } = this.state;

    return (
      <Container fluid className="px-3">
        {persons.map((person) => {
          const id = person.login.uuid;
          const fullName = `${person.name.title} ${person.name.first} ${person.name.last}`;
          const address = `${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.country} - ${person.location.postcode}`;
          const isOpen = !!openDetails[id];

          return (
            <div
              key={id}
              className="mb-3 text-dark"
              style={{
                backgroundColor: "#17a2b8",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              {/* Card Header Row */}
              <div
                className="px-3 py-2"
                style={{
                  backgroundColor: "#138496",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                }}
              >
                {fullName} - {id}
              </div>

              {/* Card Body */}
              <Row className="align-items-center py-3 px-3">
                {/* Left Column: Avatar + Details Button */}
                <Col
                  xs={12}
                  md={4}
                  lg={3}
                  className="d-flex flex-column align-items-center justify-content-center mb-3 mb-md-0"
                >
                  <img
                    src={person.picture.large}
                    alt={fullName}
                    className="rounded-circle mb-3"
                    style={{
                      width: "185px",
                      height: "185px",
                      objectFit: "cover",
                    }}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => this.toggleDetails(id)}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? "Hide Details" : "Details"}
                  </Button>
                </Col>

                {/* Right Column: User Info */}
                <Col xs={12} md={8} lg={9}>
                  <div className="mb-1">
                    <span className="d-inline-block text-end me-3" style={{ width: "175px", fontSize: "0.85rem" }}>
                      User Name:
                    </span>
                    <strong style={{ fontSize: "0.95rem" }}>{person.login.username}</strong>
                  </div>

                  <div className="mb-1">
                    <span className="d-inline-block text-end me-3" style={{ width: "175px", fontSize: "0.85rem" }}>
                      Gender:
                    </span>
                    <span style={{ fontSize: "0.9rem" }}>{person.gender.toUpperCase()}</span>
                  </div>

                  <div className="mb-1">
                    <span className="d-inline-block text-end me-3" style={{ width: "175px", fontSize: "0.85rem" }}>
                      Time Zone Description:
                    </span>
                    <span style={{ fontSize: "0.9rem" }}>{person.location.timezone.description}</span>
                  </div>

                  <div className="mb-1">
                    <span className="d-inline-block text-end me-3" style={{ width: "175px", fontSize: "0.85rem" }}>
                      Address:
                    </span>
                    <span style={{ fontSize: "0.9rem" }}>{address}</span>
                  </div>

                  <div className="mb-1">
                    <span className="d-inline-block text-end me-3" style={{ width: "175px", fontSize: "0.85rem" }}>
                      Email:
                    </span>
                    <span style={{ fontSize: "0.9rem" }}>{person.email}</span>
                  </div>

                  <div className="mb-1">
                    <span className="d-inline-block text-end me-3" style={{ width: "175px", fontSize: "0.85rem" }}>
                      Birth Date and Age:
                    </span>
                    <span style={{ fontSize: "0.9rem" }}>
                      {person.dob.date} ({person.dob.age})
                    </span>
                  </div>

                  <div className="mb-1">
                    <span className="d-inline-block text-end me-3" style={{ width: "175px", fontSize: "0.85rem" }}>
                      Register Date:
                    </span>
                    <span style={{ fontSize: "0.9rem" }}>{person.registered.date}</span>
                  </div>

                  <div className="mb-1">
                    <span className="d-inline-block text-end me-3" style={{ width: "175px", fontSize: "0.85rem" }}>
                      Phone#:
                    </span>
                    <span style={{ fontSize: "0.9rem" }}>{person.phone}</span>
                  </div>

                  <div className="mb-1">
                    <span className="d-inline-block text-end me-3" style={{ width: "175px", fontSize: "0.85rem" }}>
                      Cell#:
                    </span>
                    <span style={{ fontSize: "0.9rem" }}>{person.cell}</span>
                  </div>

                  {/* Extra expandable info when clicking Details */}
                  <Collapse in={isOpen}>
                    <div className="mt-2 pt-2 border-top border-dark-subtle">
                      <span className="d-inline-block text-end me-3" style={{ width: "175px", fontSize: "0.85rem" }}>
                        Nationality / UUID:
                      </span>
                      <span style={{ fontSize: "0.9rem" }}>
                        {person.nat} — {id}
                      </span>
                    </div>
                  </Collapse>
                </Col>
              </Row>
            </div>
          );
        })}
      </Container>
    );
  }
}

export default PersonList;