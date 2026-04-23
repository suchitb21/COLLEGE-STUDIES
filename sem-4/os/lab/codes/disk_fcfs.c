#include <stdio.h>
#include <stdlib.h>

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

    printf("\nSequence\tHead Movement\n");
    int cur = head;
    for (i = 0; i < n; i++) {
        int move = abs(req[i] - cur);
        total += move;
        printf("%d\t\t%d\n", req[i], move);
        cur = req[i];
    }

    printf("\nTotal Head Movement : %d\n", total);
    return 0;
}
