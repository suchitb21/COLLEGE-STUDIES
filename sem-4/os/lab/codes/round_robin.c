#include <stdio.h>

int main() {
    int n, i, tq, time = 0, completed = 0;
    printf("Enter number of processes: ");
    scanf("%d", &n);

    int pid[n], bt[n], rem[n], wt[n], tat[n];

    for (i = 0; i < n; i++) {
        pid[i] = i + 1;
        printf("Enter burst time for P%d: ", pid[i]);
        scanf("%d", &bt[i]);
        rem[i] = bt[i];
        wt[i]  = 0;
    }

    printf("Enter time quantum: ");
    scanf("%d", &tq);

    while (completed < n) {
        int idle = 1;
        for (i = 0; i < n; i++) {
            if (rem[i] > 0) {
                idle = 0;
                int run = (rem[i] > tq) ? tq : rem[i];
                /* all other still-running processes accumulate waiting time */
                for (int j = 0; j < n; j++)
                    if (j != i && rem[j] > 0)
                        wt[j] += run;
                time    += run;
                rem[i]  -= run;
                if (rem[i] == 0)
                    completed++;
            }
        }
        if (idle) break;
    }

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
