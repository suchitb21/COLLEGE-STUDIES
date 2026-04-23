#include <stdio.h>

int main() {
    int n, i, j;
    printf("Enter number of processes: ");
    scanf("%d", &n);

    int pid[n], at[n], bt[n], pr[n];
    int wt[n], tat[n], ct[n];
    int done[n];

    for (i = 0; i < n; i++) {
        pid[i] = i + 1;
        printf("Enter arrival time, burst time, priority for P%d: ", pid[i]);
        scanf("%d %d %d", &at[i], &bt[i], &pr[i]);
        done[i] = 0;
    }

    int completed = 0, time = 0;
    while (completed < n) {
        int idx = -1;
        /* pick highest priority (lowest number) among arrived, undone processes */
        for (i = 0; i < n; i++) {
            if (!done[i] && at[i] <= time) {
                if (idx == -1 || pr[i] < pr[idx])
                    idx = i;
            }
        }
        if (idx == -1) {
            time++;
            continue;
        }
        time += bt[idx];
        ct[idx]  = time;
        tat[idx] = ct[idx] - at[idx];
        wt[idx]  = tat[idx] - bt[idx];
        done[idx] = 1;
        completed++;
    }

    float total_wt = 0, total_tat = 0;
    printf("\nProcess\tAT\tBT\tPriority\tWT\tTAT\n");
    for (i = 0; i < n; i++) {
        printf("P%d\t%d\t%d\t%d\t\t%d\t%d\n",
               pid[i], at[i], bt[i], pr[i], wt[i], tat[i]);
        total_wt  += wt[i];
        total_tat += tat[i];
    }

    printf("\nAverage Waiting Time    : %.2f", total_wt / n);
    printf("\nAverage Turnaround Time : %.2f\n", total_tat / n);

    return 0;
}
