#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) { return (*(int*)a - *(int*)b); }

int main() {
    int n, head, i, total = 0;

    printf("Enter initial head position: ");
    scanf("%d", &head);
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

    /* service right requests towards higher cylinders */
    for (i = 0; i < rc; i++) {
        move = abs(right[i] - cur);
        total += move;
        printf("%d\t\t\t%d\n", right[i], move);
        cur = right[i];
    }

    /* jump to lowest left request (no service on jump) */
    if (lc > 0) {
        move = abs(cur - left[0]);
        total += move;
        printf("%d (wrap)\t\t%d\n", left[0], move);
        cur = left[0];

        /* service left requests upward */
        for (i = 1; i < lc; i++) {
            move = abs(left[i] - cur);
            total += move;
            printf("%d\t\t\t%d\n", left[i], move);
            cur = left[i];
        }
    }

    printf("\nTotal Head Movement : %d\n", total);
    return 0;
}
