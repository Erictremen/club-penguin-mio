import express from 'express';
import path from 'path';

import { FileServer } from "@server/file-server";
import { SettingsManager } from "@server/settings";
import { GameData } from "@server/timelines/game-data";
import { HTTP_PORT } from '@common/constants';
import { PhpServer } from './php-server';
import { PenguinRepository } from '@server/database/database';

export class HttpServer {
    private fileServer: FileServer;
    private phpServer: PhpServer;

    constructor(gameData: GameData, settings: SettingsManager, db: PenguinRepository) {
        this.fileServer = new FileServer(gameData, settings);
        this.phpServer = new PhpServer(settings, db, gameData);
    }

    public async setupServer() {
        const app = express();
        app.use(this.fileServer.getExpressRouter());
        app.use(this.phpServer.getExpressRouter());

        // SOLUCIÓN DEFINITIVA: Buscar los archivos en dist/client usando la raíz real de Render
        const publicPath = path.join(process.cwd(), 'dist/client');
        app.use(express.static(publicPath));

        // Si entran a /es o cualquier subpágina, les entregamos el index.html principal para que funcione
        app.get('*', (req, res) => {
            res.sendFile(path.join(publicPath, 'index.html'));
        });

        await new Promise<void>((resolve, reject) => {
            app.listen(HTTP_PORT, () => {
                console.log(`HTTP server listening on port ${HTTP_PORT}`);
                resolve();
            }).on('error', (err) => {
                reject(err);
            })
        })
    }
}
