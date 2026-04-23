#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) { return (*(int*)a - *(int*)b); }

int main() {
    int n, head, dir, i, total = 0;

    printf("Enter initial head position: ");
    scanf("%d", &head);
    printf("Enter number of disk requests: ");
    scanf("%d", &n);

    int req[n];
    printf("Enter disk request queue: ");
    for (i = 0; i < n; i++)
        scanf("%d", &req[i]);

    printf("Enter direction (1 = towards higher, 0 = towards lower): ");
    scanf("%d", &dir);

    qsort(req, n, sizeof(int), cmp);

    int left[n], right[n], lc = 0, rc = 0;
    for (i = 0; i < n; i++) {
        if (req[i] < head)  left[lc++]  = req[i];
        else                right[rc++] = req[i];
    }

    printf("\nSequence\tHead Movement\n");
    int cur = head, move;

    if (dir == 1) {
        /* go right up to last request, then reverse left */
        for (i = 0; i < rc; i++) {
            move = abs(right[i] - cur);
            total += move;
            printf("%d\t\t%d\n", right[i], move);
            cur = right[i];
        }
        for (i = lc - 1; i >= 0; i--) {
            move = abs(left[i] - cur);
            total += move;
            printf("%d\t\t%d\n", left[i], move);
            cur = left[i];
        }
    } else {
        /* go left down to last request, then reverse right */
        for (i = lc - 1; i >= 0; i--) {
            move = abs(left[i] - cur);
            total += move;
            printf("%d\t\t%d\n", left[i], move);
            cur = left[i];
        }
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
