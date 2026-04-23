#include <stdio.h>

int main() {
    int n, i, time;
    printf("Enter number of processes: ");
    scanf("%d", &n);

    int pid[n], at[n], bt[n], rem[n];
    int wt[n], tat[n], ct[n];
    int done[n];

    for (i = 0; i < n; i++) {
        pid[i] = i + 1;
        printf("Enter arrival time and burst time for P%d: ", pid[i]);
        scanf("%d %d", &at[i], &bt[i]);
        rem[i]  = bt[i];
        done[i] = 0;
    }

    int completed = 0, min_time, idx;
    for (time = 0; completed < n; time++) {
        idx = -1;
        min_time = 9999;
        /* pick arrived process with shortest remaining time */
        for (i = 0; i < n; i++) {
            if (!done[i] && at[i] <= time && rem[i] < min_time) {
                min_time = rem[i];
                idx = i;
            }
        }
        if (idx == -1)
            continue;

        rem[idx]--;
        if (rem[idx] == 0) {
            ct[idx]   = time + 1;
            tat[idx]  = ct[idx] - at[idx];
            wt[idx]   = tat[idx] - bt[idx];
            done[idx] = 1;
            completed++;
        }
    }

    float total_wt = 0, total_tat = 0;
    printf("\nProcess\tAT\tBT\tWT\tTAT\n");
    for (i = 0; i < n; i++) {
        printf("P%d\t%d\t%d\t%d\t%d\n", pid[i], at[i], bt[i], wt[i], tat[i]);
        total_wt  += wt[i];
        total_tat += tat[i];
    }

    printf("\nAverage Waiting Time    : %.2f", total_wt / n);
    printf("\nAverage Turnaround Time : %.2f\n", total_tat / n);

    return 0;
}
