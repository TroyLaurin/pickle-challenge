import http from 'k6/http';
import { check } from 'k6';

const baseUrl = 'https://586k4m13zh.execute-api.us-east-1.amazonaws.com/prod/';

export const options = {
	scenarios: {
		setup: {
			executor: 'shared-iterations',
			vus: 1,
			iterations: 1,
			maxDuration: '5s',
			exec: 'resetMemcached'
		},
		warmup: {
			executor: 'shared-iterations',
			vus: 10,
			iterations: 30,
			startTime: '5s',
			maxDuration: '10s',
			exec: 'testMemcached',
		},
		// timing: {
		// 	executor: 'shared-iterations',
		// 	vus: 2,
		// 	iterations: 6,
		// 	startTime: '15s',
		// 	maxDuration: '10s',
		// 	exec: 'testMemcached',
		// }
	}
};

export function resetMemcached() {
	const res = http.post(baseUrl + 'reset-memcached');
	check(res, {
		'is status ok': (r) => r.status === 200,
	})
}

export function testMemcached() {
	const res = http.post(baseUrl + 'charge-request-memcached');
	console.log(res.body)
	check(res, {
		'is status ok': (r) => r.status === 200,
	})
}
