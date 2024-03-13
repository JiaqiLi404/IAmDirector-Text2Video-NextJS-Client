import type { NextApiRequest, NextApiResponse } from 'next';
export declare function GET(request: Request): Promise<Response>;
export default function handler(req: NextApiRequest, res: NextApiResponse): Promise<void>;
