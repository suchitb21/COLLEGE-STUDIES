#include <stdio.h>

int main() {
    int n, i, j;
    printf("Enter number of processes: ");
    scanf("%d", &n);

    int pid[n], bt[n], wt[n], tat[n];

    for (i = 0; i < n; i++) {
        pid[i] = i + 1;
        printf("Enter burst time for P%d: ", pid[i]);
        scanf("%d", &bt[i]);
    }

    /* sort by burst time (selection sort) — arrival time = 0 for all */
    for (i = 0; i < n - 1; i++) {
        for (j = i + 1; j < n; j++) {
            if (bt[j] < bt[i]) {
                int tmp;
                tmp = bt[i];  bt[i] = bt[j];  bt[j] = tmp;
                tmp = pid[i]; pid[i] = pid[j]; pid[j] = tmp;
            }
        }
    }

    wt[0] = 0;
    for (i = 1; i < n; i++)
        wt[i] = wt[i - 1] + bt[i - 1];

    float total_wt = 0, total_tat = 0;
    printf("\nProcess\tBurst Time\tWaiting Time\tTurnaround Time\n");
    for (i = 0; i < n; i++) {
        tat[i] = wt[i] + bt[i];
        printf("P%d\t%d\t\t%d\t\t%d\n", pid[i], bt[i], wt[i], tat[i]);
        total_wt  += wt[i];
        total_tat += tat[i];
    }

    printf("\nAverage Waiting Time    : %.2f", total_wt / n);
    printf("\nAverage Turnaround Time : %.2f\n", total_tat / n);

    return 0;
}
