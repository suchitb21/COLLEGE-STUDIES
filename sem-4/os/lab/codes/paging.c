#include <stdio.h>

int main() {
    int page_size, n, i;

    printf("Enter page size (in bytes): ");
    scanf("%d", &page_size);

    printf("Enter number of pages: ");
    scanf("%d", &n);

    int page_table[n];
    printf("Enter frame number for each page:\n");
    for (i = 0; i < n; i++) {
        printf("  Page %d -> Frame: ", i);
        scanf("%d", &page_table[i]);
    }

    printf("\nPage Table:\n");
    printf("Page No.\tFrame No.\n");
    for (i = 0; i < n; i++)
        printf("%d\t\t%d\n", i, page_table[i]);

    int choice = 1;
    while (choice) {
        int logical;
        printf("\nEnter logical address: ");
        scanf("%d", &logical);

        int page_no = logical / page_size;
        int offset  = logical % page_size;

        if (page_no >= n) {
            printf("Error: Page number %d out of range.\n", page_no);
        } else {
            int frame_no  = page_table[page_no];
            int physical  = frame_no * page_size + offset;
            printf("Page Number : %d\n", page_no);
            printf("Offset      : %d\n", offset);
            printf("Frame Number: %d\n", frame_no);
            printf("Physical Address: %d\n", physical);
        }

        printf("Translate another address? (1=Yes / 0=No): ");
        scanf("%d", &choice);
    }

    return 0;
}
