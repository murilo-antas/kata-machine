export default function solve(maze: string[], wall: string, start: Point, 
                              end: Point): Point[] {
    const seen: boolean[][] = [];
    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    const path: Point[] = [];
    if (walk(maze, wall, start, end, seen, path)) {
        return path;
    }

    return [];
}

function walk(maze: string[], wall: string, current: Point, end: Point, 
              seen: boolean[][], path: Point[]): boolean {
    if (current.x < 0 || current.x >= maze[0].length || 
        current.y < 0 || current.y >= maze.length) {
        return false;
    }

    if (seen[current.y][current.x]) {
        return false;
    }

    if (maze[current.y][current.x] === wall) {
        return false;
    }

    if (current.x === end.x && current.y === end.y) {
        return true;
    }

    seen[current.y][current.x] = true;
    path.push(current);
    
    for (let i = 0; i < directions.length; i++) {
        const direction = directions[i];
        const next = { x: current.x + direction[0], y: current.y + direction[1] } as Point;
        if (walk(maze, wall, next, end, seen, path)) {
            path.push(end);
            return true;
        }
    }

    path.pop();

    return false;
}

const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
];
