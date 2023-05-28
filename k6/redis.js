import http from 'k6/http';
import { check } from 'k6';

const baseUrl = 'https://wtwc74zu87.execute-api.us-east-1.amazonaws.com/prod/';

export const options = {
	scenarios: {
		setup: {
			executor: 'shared-iterations',
			vus: 1,
			iterations: 1,
			maxDuration: '5s',
			exec: 'resetRedis'
		},
		warmup: {
			executor: 'shared-iterations',
			vus: 25,
			iterations: 50,
			startTime: '5s',
			maxDuration: '10s',
			exec: 'testRedis',
		},
		// timing: {
		// 	executor: 'shared-iterations',
		// 	vus: 2,
		// 	iterations: 6,
		// 	startTime: '15s',
		// 	maxDuration: '10s',
		// 	exec: 'testRedis',
		// }
	}
};

export function resetRedis() {
	const res = http.post(baseUrl + 'reset-redis');

	console.log(res.body)

	check(res, {
		'is status ok': (r) => r.status === 200,
	})
}

export function testRedis() {
	const res = http.post(baseUrl + 'charge-request-redis');

	console.log(res.body)

	check(res, {
		'is status ok': (r) => r.status === 200,
	})
}

