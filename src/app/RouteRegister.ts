import { Router, Request, Response, NextFunction } from 'express';
import glob from 'glob';
import ErrorHandler from './ErrorHandler';

export default function registerRoutes(router: Router): void {
	const routes = glob.sync(`${__dirname}/../**/*.route.*`);
	routes.map(route => register(route, router));

	registerErrorHandler(router);
	create404Fallback(router);
}

function register(routePath: string, router: Router) {
	// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
	const { register } = require(routePath) as { register: (router: Router) => void };
	register(router);
}

function registerErrorHandler(router: Router) {
	router.use((err: Error, req: Request, res: Response, next: NextFunction) => { 
		ErrorHandler.handleError(err, next, res);
	})
}

function create404Fallback(router: Router) {
	router.use((req: Request, res: Response) => {
		res.status(404)
			.json({
				code: 404,
				message: 'Not found',
				success: false,
				data: [],
			});
	});
}