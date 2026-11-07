/**
 * Reloj de tiempo fijo.
 *
 * Idea clave: el motor NUNCA le pregunta la hora al sistema.
 * Siempre le pregunta a este reloj "¿en qué segundo estoy?".
 *
 * - Preview: el tiempo lo manda la canción que está sonando (seekSeconds).
 * - Export: el reloj avanza frame por frame (advance), sin importar
 *   qué tan rápido o lento corra la PC.
 *
 * Nota: el reloj guarda el frame como número entero, así que el tiempo
 * queda "cuantizado" a 1/fps. Para este proyecto es lo que queremos.
 */
export class FixedClock {
    private currentFrame = 0;

    constructor(
        readonly fps: number,
        readonly durationSeconds: number,
    ) {
        if (!(fps > 0)) {
            throw new RangeError('fps must be greater than 0');
        }
        if (!(durationSeconds >= 0)) {
            throw new RangeError('durationSeconds must be 0 or greater');
        }
    }

    /** Número de frame actual (0, 1, 2, ...). */
    get frame(): number {
        return this.currentFrame;
    }

    /** Tiempo actual en segundos. */
    get time(): number {
        return this.currentFrame / this.fps;
    }

    /** Total de frames del video. */
    get totalFrames(): number {
        return Math.ceil(this.durationSeconds * this.fps);
    }

    /** Es true cuando ya no hay más frames por avanzar. */
    get isFinished(): boolean {
        return this.currentFrame >= this.totalFrames;
    }

    /** Avanza un frame. Lo usa el export. */
    advance(): void {
        if (!this.isFinished) {
            this.currentFrame += 1;
        }
    }

    /** Salta a un frame concreto (se limita al rango válido). */
    seekFrame(frame: number): void {
        this.currentFrame = Math.min(Math.max(0, Math.floor(frame)), this.totalFrames);
    }

    /** Salta a un segundo concreto. Lo usa el preview. */
    seekSeconds(seconds: number): void {
        this.seekFrame(seconds * this.fps);
    }

    /** Regresa al inicio. */
    reset(): void {
        this.currentFrame = 0;
    }
}