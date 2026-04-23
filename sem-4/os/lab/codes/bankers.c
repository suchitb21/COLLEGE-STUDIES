#include <stdio.h>

int main() {
    int n, r, i, j;

    printf("Enter number of processes: ");
    scanf("%d", &n);
    printf("Enter number of resource types: ");
    scanf("%d", &r);

    int alloc[n][r], maxm[n][r], need[n][r], avail[r];

    printf("Enter Allocation Matrix:\n");
    for (i = 0; i < n; i++)
        for (j = 0; j < r; j++)
            scanf("%d", &alloc[i][j]);

    printf("Enter Max Matrix:\n");
    for (i = 0; i < n; i++)
        for (j = 0; j < r; j++)
            scanf("%d", &maxm[i][j]);

    printf("Enter Available Resources: ");
    for (j = 0; j < r; j++)
        scanf("%d", &avail[j]);

    /* calculate need matrix */
    for (i = 0; i < n; i++)
        for (j = 0; j < r; j++)
            need[i][j] = maxm[i][j] - alloc[i][j];

    printf("\nNeed Matrix:\n");
    for (i = 0; i < n; i++) {
        printf("P%d: ", i);
        for (j = 0; j < r; j++)
            printf("%d ", need[i][j]);
        printf("\n");
    }

    /* safety algorithm */
    int finish[n], safe_seq[n], work[r];
    for (i = 0; i < n; i++) finish[i] = 0;
    for (j = 0; j < r; j++) work[j]   = avail[j];

    int count = 0;
    while (count < n) {
        int found = 0;
        for (i = 0; i < n; i++) {
            if (!finish[i]) {
                int can = 1;
                for (j = 0; j < r; j++)
                    if (need[i][j] > work[j]) { can = 0; break; }

                if (can) {
                    for (j = 0; j < r; j++)
                        work[j] += alloc[i][j];
                    safe_seq[count++] = i;
                    finish[i] = 1;
                    found = 1;
                }
            }
        }
        if (!found) break;
    }

    if (count == n) {
        printf("\nSystem is in a SAFE state.\nSafe Sequence: ");
        for (i = 0; i < n; i++)
            printf("P%d%s", safe_seq[i], i < n - 1 ? " -> " : "\n");
    } else {
        printf("\nSystem is in an UNSAFE state (Deadlock possible).\n");
    }

    return 0;
}
