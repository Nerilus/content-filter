import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import contentService from "../../Api"

// const Home = ({ contacts, deleteContact }) => 

  class Home extends Component{
    constructor(props){
      super(props)
        this.state = {
            contents:[]
        }
    }
    componentDidMount(){
      contentService.getAllContents().then((res) => {
          this.setState({ contents: res.data})
      })
    }

    render(){
      return (
        <div className="container">
          <div className="row d-flex flex-column">
            <Link to="/add" className="btn btn-outline-dark my-5 ml-auto ">
              Add Contact
            </Link>
            <div className="col-md-10 mx-auto my-4">
              <table className="table table-hover">
                <thead className="table-header bg-dark text-white">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.contents.map (
                        content =>
                      <tr key={content.id}>
                        <td>{content.url}</td>
                        <td>{content.word}</td>
                        {/* <td>{contact.phone}</td> */}
                        <td>
                          <Link
                            to={`/edit/${content.id}`}
                            className="btn btn-sm btn-primary mr-1"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => deleteContact(content.id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  }
               
                    {/* <tr>
                      <th>No contacts found</th>
                    </tr> */}
      
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };
    }
  

const mapStateToProps = (state) => ({
  contacts: state,
});

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
