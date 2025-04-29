function walk(current: BinaryNode<number> | null, path: number[]): void {
    if (!current) {
        return;
    }

    walk(current.left, path);
    walk(current.right, path);
    path.push(current.value);
}
export default function post_order_search(head: BinaryNode<number>): number[] {
    const path: number[] = [];
    walk(head, path);
    return path;
}
