#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) { return (*(int*)a - *(int*)b); }

int main() {
    int n, head, disk_size, i, total = 0;

    printf("Enter initial head position: ");
    scanf("%d", &head);
    printf("Enter total disk size: ");
    scanf("%d", &disk_size);
    printf("Enter number of disk requests: ");
    scanf("%d", &n);

    int req[n];
    printf("Enter disk request queue: ");
    for (i = 0; i < n; i++)
        scanf("%d", &req[i]);

    qsort(req, n, sizeof(int), cmp);

    int left[n], right[n], lc = 0, rc = 0;
    for (i = 0; i < n; i++) {
        if (req[i] < head)  left[lc++]  = req[i];
        else                right[rc++] = req[i];
    }

    printf("\nSequence\t\tHead Movement\n");
    int cur = head, move;

    /* go right, service all requests towards higher end */
    for (i = 0; i < rc; i++) {
        move = abs(right[i] - cur);
        total += move;
        printf("%d\t\t\t%d\n", right[i], move);
        cur = right[i];
    }

    /* jump to disk end then wrap to 0 (no service on return) */
    move = abs((disk_size - 1) - cur);
    total += move;
    printf("%d (end)\t\t\t%d\n", disk_size - 1, move);
    total += (disk_size - 1); /* jump from end to 0 */
    printf("0 (wrap)\t\t%d\n", disk_size - 1);
    cur = 0;

    /* service left requests from cylinder 0 upward */
    for (i = 0; i < lc; i++) {
        move = abs(left[i] - cur);
        total += move;
        printf("%d\t\t\t%d\n", left[i], move);
        cur = left[i];
    }

    printf("\nTotal Head Movement : %d\n", total);
    return 0;
}
