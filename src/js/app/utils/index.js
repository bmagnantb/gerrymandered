import Rx from 'rx'

export reduxPromiseMW from './reduxPromiseMW'

export const makeEventStream = () => {
	var subject = function() {
		subject.onNext.apply(subject, arguments)
	}

	for (var key in Rx.Subject.prototype) {
		subject[key] = Rx.Subject.prototype[key]
	}
	Rx.Subject.call(subject)

	return subject
}
