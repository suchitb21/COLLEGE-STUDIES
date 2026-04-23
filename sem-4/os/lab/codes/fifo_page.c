#include <stdio.h>

int main() {
    int n, frames, i, j, faults = 0;

    printf("Enter number of page references: ");
    scanf("%d", &n);
    int pages[n];
    printf("Enter reference string: ");
    for (i = 0; i < n; i++)
        scanf("%d", &pages[i]);

    printf("Enter number of frames: ");
    scanf("%d", &frames);

    int frame[frames], front = 0, count = 0;
    for (i = 0; i < frames; i++)
        frame[i] = -1;

    printf("\nPage\tFrames\t\t\tFault\n");
    for (i = 0; i < n; i++) {
        int found = 0;
        for (j = 0; j < frames; j++)
            if (frame[j] == pages[i]) { found = 1; break; }

        if (!found) {
            frame[front] = pages[i];
            front = (front + 1) % frames;
            if (count < frames) count++;
            faults++;
            printf("%d\t", pages[i]);
            for (j = 0; j < frames; j++)
                frame[j] == -1 ? printf("-  ") : printf("%d  ", frame[j]);
            printf("\tYes\n");
        } else {
            printf("%d\t", pages[i]);
            for (j = 0; j < frames; j++)
                frame[j] == -1 ? printf("-  ") : printf("%d  ", frame[j]);
            printf("\tNo\n");
        }
    }

    printf("\nTotal Page Faults: %d\n", faults);
    return 0;
}
