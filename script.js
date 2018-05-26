class Stopwatch extends React.Component {
    constructor() {
        super()
        this.state = {
            running: false,
            loop: 0,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
        }
    }

    reset() {
		this.setState({
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		})
	}

    print() {
        this.display.innerText = this.format(this.times)
	}

	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`
	}

	start() {
		if(!this.state.running){
			this.state.running = 'true';
			this.watch = setInterval(() => this.step(), 10)
	}

	step = () => {
		if(!this.state.running) return
			this.calculate()
	}

	calculate = () => {
	    this.setState({
			times: {
				minutes: this.state.times.minutes,
				seconds: this.state.times.seconds,
				miliseconds: this.state.times.miliseconds + 1
			}	
		})
		
		if(this.state.times.miliseconds >= 100){
			this.setState({
				times: {
					minutes: this.state.times.minutes,
					seconds: this.state.times.seconds + 1,
					miliseconds: 0
				}
			})
		}
		
		if(this.state.times.seconds >= 60){
			this.setState({
				times: {
					minutes: this.state.times.minutes +1,
					seconds: 0, 
					miliseconds: this.state.times.miliseconds 
				}
			})
		}
	}

	stop = () => {
		this.setState({
			running: false
		})

	resetCounter= () => {
		this.stop()
		this.reset()
		this.print()
	}

	render = () => {
		return (
			<div className="container">
		      	<nav className="controls">
		        	<a href="#" className="button" id="start" onClic={this.start}>Start</a>
		        	<a href="#" className="button" id="stop" onClick={this.stop}>Stop</a>
		        	<a href="#" className="button" id="reset" onClic={this.reset}>Reset</a>
		      	</nav>
		      	<div className="stopwatch">{this.format(this.state.times)}</div>
		      	<ul className="results"></ul>
		    </div>
		)
	}
}

pad0 = (value) => {
	let result = value.toString()
	if (result.length <2) {
		result = 0 + result
	}
	return result
}

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
