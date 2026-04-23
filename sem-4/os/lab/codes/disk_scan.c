#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) { return (*(int*)a - *(int*)b); }

int main() {
    int n, head, disk_size, dir, i, total = 0;

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

    printf("Enter direction (1 = towards higher, 0 = towards lower): ");
    scanf("%d", &dir);

    qsort(req, n, sizeof(int), cmp);

    /* split into left and right of head */
    int left[n], right[n], lc = 0, rc = 0;
    for (i = 0; i < n; i++) {
        if (req[i] < head)  left[lc++]  = req[i];
        else                right[rc++] = req[i];
    }

    printf("\nSequence\tHead Movement\n");
    int cur = head;

    if (dir == 1) {
        /* go right first, then left */
        for (i = 0; i < rc; i++) {
            int move = abs(right[i] - cur);
            total += move;
            printf("%d\t\t%d\n", right[i], move);
            cur = right[i];
        }
        /* go to disk end */
        int move = abs((disk_size - 1) - cur);
        total += move;
        printf("%d (end)\t\t%d\n", disk_size - 1, move);
        cur = disk_size - 1;
        for (i = lc - 1; i >= 0; i--) {
            move = abs(left[i] - cur);
            total += move;
            printf("%d\t\t%d\n", left[i], move);
            cur = left[i];
        }
    } else {
        /* go left first, then right */
        for (i = lc - 1; i >= 0; i--) {
            int move = abs(left[i] - cur);
            total += move;
            printf("%d\t\t%d\n", left[i], move);
            cur = left[i];
        }
        /* go to disk start */
        int move = abs(cur - 0);
        total += move;
        printf("0 (end)\t\t%d\n", move);
        cur = 0;
        for (i = 0; i < rc; i++) {
            move = abs(right[i] - cur);
            total += move;
            printf("%d\t\t%d\n", right[i], move);
            cur = right[i];
        }
    }

    printf("\nTotal Head Movement : %d\n", total);
    return 0;
}
