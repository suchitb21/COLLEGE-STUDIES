#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, head, i, total = 0;

    printf("Enter initial head position: ");
    scanf("%d", &head);

    printf("Enter number of disk requests: ");
    scanf("%d", &n);

    int req[n], done[n];
    printf("Enter disk request queue: ");
    for (i = 0; i < n; i++) {
        scanf("%d", &req[i]);
        done[i] = 0;
    }

    printf("\nSequence\tHead Movement\n");
    int cur = head, completed = 0;
    while (completed < n) {
        int idx = -1, min_dist = 99999;
        for (i = 0; i < n; i++) {
            if (!done[i] && abs(req[i] - cur) < min_dist) {
                min_dist = abs(req[i] - cur);
                idx = i;
            }
        }
        total += min_dist;
        printf("%d\t\t%d\n", req[idx], min_dist);
        cur = req[idx];
        done[idx] = 1;
        completed++;
    }

    printf("\nTotal Head Movement : %d\n", total);
    return 0;
}
