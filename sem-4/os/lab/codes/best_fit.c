#include <stdio.h>

int main() {
    int nb, np, i, j;

    printf("Enter number of memory blocks: ");
    scanf("%d", &nb);
    int block[nb], bsize[nb];
    for (i = 0; i < nb; i++) {
        printf("Enter size of block %d: ", i + 1);
        scanf("%d", &bsize[i]);
        block[i] = bsize[i];
    }

    printf("Enter number of processes: ");
    scanf("%d", &np);
    int psize[np], alloc[np];
    for (i = 0; i < np; i++) {
        printf("Enter size of process %d: ", i + 1);
        scanf("%d", &psize[i]);
        alloc[i] = -1;
    }

    for (i = 0; i < np; i++) {
        int best = -1;
        for (j = 0; j < nb; j++) {
            if (block[j] >= psize[i]) {
                if (best == -1 || block[j] < block[best])
                    best = j;
            }
        }
        if (best != -1) {
            alloc[i] = best + 1;
            block[best] -= psize[i];
        }
    }

    printf("\nProcess\tSize\tBlock Allocated\tFragmentation\n");
    for (i = 0; i < np; i++) {
        if (alloc[i] != -1)
            printf("P%d\t%d\t%d\t\t%d\n",
                   i + 1, psize[i], alloc[i], block[alloc[i] - 1]);
        else
            printf("P%d\t%d\tNot Allocated\t-\n", i + 1, psize[i]);
    }

    return 0;
}
