import React, { Component } from 'react';

class Clock extends Component {
  
    constructor(props) {
        super(props)

        this.timer = 0
        this.birthday = props.birthdayFormState.startDate.toString()
        this.getTimeRemaining = this.getTimeRemaining.bind(this);

        this.noBirthYear = new Date(this.birthday).getFullYear() == new Date().getFullYear()

        this.state = {
            timeRemaining: this.getTimeRemaining(props.birthdayFormState.startDate.toString())
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(`next props: ${JSON.stringify(nextProps)}`)
    }

    getTimeRemaining(birthday) {
        
        var bday = new Date(birthday);
        let today = new Date();

        const currentMonth = today.getMonth();
        const birthMonth = bday.getMonth();

        if(birthMonth > currentMonth) {
            // 1. month is after the current month
            bday.setFullYear(today.getFullYear());
        } 
        else if (birthMonth < currentMonth) {
             // 2. month is before the current month
            bday.setFullYear(today.getFullYear() + 1);
        }
        else if (birthMonth == currentMonth) {
            const birthDay = bday.getDate();
            const currentDay = today.getDate();
            
            if(birthDay > currentDay) {
                // 1. month is after the current month
                bday.setFullYear(today.getFullYear());
            } 
            else if (birthDay < currentDay) {
                 // 2. month is before the current month
                bday.setFullYear(today.getFullYear() + 1);
            }
            else {
                return 0
            }
        }

        var distance = bday.getTime() - today.getTime();
        
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        return {
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    getAge = () => {
        var bday = new Date(this.birthday);
        var today = new Date();

        var distance = today.getTime() - bday.getTime();
        var daysOld = Math.floor(distance / (1000 * 60 * 60 * 24));
        var yearsOld = Number((daysOld / 365).toFixed(0));

        return yearsOld
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            const timeRemaining = this.getTimeRemaining(this.birthday)
            this.setState({ timeRemaining: timeRemaining })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    renderMessage = () => {
        if(this.noBirthYear) {
            return (
                <h4>until your birthday!</h4>
            )
        }
        return (
            <h4>remianing until you are {this.getAge()}</h4>
        )
    }

  render() {
    const data = this.state.timeRemaining

    return (
        <div className='countdown'>
            {
                this.state.timeRemaining == 0 ?
                    <h1>Happy Birthday!</h1>
                :
                <div>
                    <div>
                        <ul className='countdown__clock'>
                            <li>DAYS <p>{data.days}</p></li>
                            <li>HRS <p>{data.hours}</p></li>
                            <li>MINS <p>{data.minutes}</p></li>
                            <li>SECS <p>{data.seconds}</p></li>
                        </ul>
                    </div>
                    <div>
                        {this.renderMessage()}
                    </div>
                </div>
            }
        </div>
    );
  }

}

export default Clock;