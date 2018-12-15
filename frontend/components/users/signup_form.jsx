import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      zipcode: '',
      month: '',
      date: '',
      year: '',
    };
    this.props.clearErrors();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  handleDemo(e) {
    e.preventDefault();
    this.props.login();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
    });
  }
  renderErrors() {
    let name = "no-error";
    if (this.props.errors.length !== 0) {
      name="error";
    }
    return(
      <ul className={name}>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  createYear(yearfrom, yearto) {
    const years = [];
    for (var i = yearfrom; i < yearto; i++) {
      years.push(i);
    }
    return years;
  }

  render() {
    const days = Array.from(Array(32).keys());
    const daymap = days.map(day => {
      if (day === 0) {
        day = "Day";
      }
      return (<option value={day} key={day}>{day}</option>);
    });

    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthmap = month.map((mon, idx) => {
      return (<option value={mon} key={idx}>{mon}</option>);
    });

    const years = Array.from(Array(118).keys());
    const yearsmap = years.map((year, idx) => {
      year = 2018;
      return (<option value={year - idx} key={idx}>{year - idx}</option>);
    });


    return (
      <div>
        <div className="header"><Link to="/">Foodie</Link></div>
        <div className="form-img">
          <form onSubmit={this.handleSubmit} className="login-form">
              <h3>Sign Up for Foodie</h3>
                <p> Connect with great local businesses</p>
                {this.renderErrors()}
              <div className="signin-input-1-2">
                <input type="text"
                  value={this.state.firstname}
                  onChange={this.update('firstname')}
                  placeholder ="First Name"
                />

                <input type="text"
                  value={this.state.lastname}
                  onChange={this.update('lastname')}
                  placeholder ="Last Name"
                />
              </div>
                <input type="text"
                  value={this.state.username}
                  onChange={this.update('username')}
                  className="signin-input-1"
                  placeholder ="Username"
                />
                  <input type="password"
                    value={this.state.password}
                    onChange={this.update('password')}
                    className="signin-input-1"
                    placeholder ="Password"
                  />
                  <input type="number"
                    value={this.state.zipcode}
                    onChange={this.update('zipcode')}
                    className="signin-input-1"
                    placeholder ="ZIP code"
                  />
                  <div className="birthday">
                    <p>Birthday <span>Optional</span></p>
                    <div className="input-1-3">
                      <select className="month" name="month" onChange={this.update('month')} value={this.state.month}>
                        <option value="">Month</option>
                        {monthmap}
                      </select>

                      <select name="day" onChange={this.update('date')} value={this.state.date}>
                        {daymap}
                      </select>

                      <select name="year" onChange={this.update('year')} value={this.state.year}>
                        <option value="">Year</option>
                        {yearsmap}
                    </select>
                    </div>
                  </div>
              <input type="submit" value="Sign Up" />
              <button onClick={this.handleDemo}>Demo</button>
              <p className="swap-signup"> Already in Foodie?<Link to='/login'>Log in</Link></p>
          </form>
          <div>
            <img src="https://images.pexels.com/photos/940302/pexels-photo-940302.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
          </div>
      </div>
    </div>
    );
  }
}

export default withRouter(SignupForm);
