const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, LevelFormat, PageBreak
} = require("docx");
const fs = require("fs");

// ── helpers ────────────────────────────────────────────────────────────────
const border  = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };

function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 140 },
    children: [new TextRun({ text, bold: true, size: 34, font: "Arial" })] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 100 },
    children: [new TextRun({ text, bold: true, size: 27, font: "Arial", color: "1F5C99" })] });
}
function h3(text) {
  return new Paragraph({ spacing: { before: 180, after: 60 },
    children: [new TextRun({ text, bold: true, size: 24, font: "Arial", color: "2E75B6" })] });
}
function q(text) {
  return new Paragraph({ spacing: { before: 160, after: 40 },
    children: [new TextRun({ text, bold: true, size: 23, font: "Arial", color: "1A3A5C" })] });
}
function a(text) {
  return new Paragraph({ spacing: { before: 0, after: 60 }, indent: { left: 300 },
    children: [new TextRun({ text, size: 22, font: "Arial" })] });
}
function bullet(text, bold_prefix) {
  const runs = bold_prefix
    ? [new TextRun({ text: bold_prefix + " ", bold: true, size: 21, font: "Arial" }),
       new TextRun({ text, size: 21, font: "Arial" })]
    : [new TextRun({ text, size: 21, font: "Arial" })];
  return new Paragraph({ numbering: { reference: "bullets", level: 0 },
    spacing: { before: 30, after: 30 }, children: runs });
}
function note(text) {
  return new Paragraph({ spacing: { before: 60, after: 60 }, indent: { left: 300 },
    children: [new TextRun({ text: "NOTE: " + text, size: 20, font: "Arial", italics: true, color: "B00000" })] });
}
function separator() {
  return new Paragraph({ spacing: { before: 60, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "C0C0C0" } }, children: [] });
}
function pageBreak() { return new Paragraph({ children: [new PageBreak()] }); }

function refTable(rows) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2800, 6560],
    rows: rows.map(([label, val], i) =>
      new TableRow({ children: [
        new TableCell({ borders, width: { size: 2800, type: WidthType.DXA },
          shading: { fill: i % 2 === 0 ? "D6E8F7" : "EBF3FB", type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 20, font: "Arial" })] })] }),
        new TableCell({ borders, width: { size: 6560, type: WidthType.DXA },
          shading: { fill: i % 2 === 0 ? "FAFAFA" : "FFFFFF", type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: val, size: 20, font: "Arial" })] })] })
      ]})
    )
  });
}

// ── document content ────────────────────────────────────────────────────────
const children = [];

// COVER
children.push(
  new Paragraph({ spacing: { before: 3000 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "OS Practical Viva Preparation", bold: true, size: 60, font: "Arial" })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 240 },
    children: [new TextRun({ text: "Jan\u2013April 2026 | Deep-Coverage Edition", size: 36, font: "Arial", color: "444444" })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120 },
    children: [new TextRun({ text: "Theory \u2022 Practicals \u2022 Viva Q&A \u2022 Edge Cases", size: 28, font: "Arial", color: "666666", italics: true })] }),
  pageBreak()
);

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — UNIT-WISE THEORY
// ══════════════════════════════════════════════════════════════════════════════
children.push(h1("SECTION 1 \u2014 Unit-wise Theory Q&A"), separator());

// ─── UNIT I ───────────────────────────────────────────────────────────────
children.push(h2("Unit I \u2014 Fundamentals of Operating System"));

children.push(q("Q1. What is an Operating System? What are its primary objectives?"));
children.push(a("An Operating System (OS) is system software that acts as an intermediary between the user and the computer hardware. It manages all hardware resources (CPU, memory, I/O devices) and provides an environment for application programs to run correctly and efficiently."));
children.push(a("Three primary objectives:"));
children.push(bullet("Convenience \u2014 Makes using the computer easier by hiding hardware complexity from users.", "1."));
children.push(bullet("Efficiency \u2014 Ensures hardware resources are utilized optimally (maximizing CPU usage, minimizing idle time).", "2."));
children.push(bullet("Ability to Evolve \u2014 The OS must be structured to allow new hardware, system functions, and bug fixes to be introduced without disrupting existing services.", "3."));
children.push(note("Without an OS, every programmer would have to write hardware-level code for every device they want to use. The OS provides these services once, for all programs."));
children.push(separator());

children.push(q("Q2. Explain the System Boot (Bootstrap) Process in detail."));
children.push(a("When power is switched on, the CPU executes from a fixed ROM/EEPROM address. The Bootstrap Loader (BIOS/UEFI) stored there performs the following steps:"));
children.push(bullet("POST (Power-On Self Test) \u2014 checks whether all hardware (RAM, disk, keyboard) is functioning.", "1."));
children.push(bullet("Locates the bootable device (disk, USB) and reads the MBR (Master Boot Record).", "2."));
children.push(bullet("The MBR contains a small bootloader (e.g., GRUB on Linux) that loads the OS kernel from disk into RAM.", "3."));
children.push(bullet("Kernel initializes device drivers, memory management, the process scheduler, and mounts the root filesystem.", "4."));
children.push(bullet("Control is handed to the init/systemd process (PID 1), which starts all system services.", "5."));
children.push(a("Why ROM? Because RAM loses data on power-off. The bootstrap code must survive across power cycles."));
children.push(separator());

children.push(q("Q3. What are the major functions of an OS?"));
children.push(bullet("Process Management \u2014 creating/terminating processes, scheduling CPU, IPC, synchronization.", "1."));
children.push(bullet("Memory Management \u2014 tracking which memory is in use, allocating/deallocating, swapping.", "2."));
children.push(bullet("File System Management \u2014 creating/deleting files, directory management, access control.", "3."));
children.push(bullet("Device Management \u2014 managing I/O devices via device drivers, buffering, spooling.", "4."));
children.push(bullet("Security & Protection \u2014 user authentication, access rights, preventing unauthorized use.", "5."));
children.push(bullet("Networking \u2014 protocols, connections, data transfer across networks.", "6."));
children.push(bullet("Command Interpreter (Shell) \u2014 reads and executes user commands (CLI or GUI).", "7."));
children.push(separator());

children.push(q("Q4. Differentiate Multiprogramming, Multitasking, and Multithreading. Why were they introduced?"));
children.push(a("These are three techniques introduced to improve CPU utilization and user experience:"));
children.push(bullet("Multiprogramming: Multiple programs reside in memory simultaneously. When one process waits for I/O, the CPU switches to another. Goal: maximize CPU utilization (prevent CPU from sitting idle). The degree of multiprogramming = number of programs in memory.", ""));
children.push(bullet("Multitasking (Time-Sharing): Extension of multiprogramming where CPU switches so rapidly (via time quantum) that each user feels the system is dedicated to them. Goal: minimize response time for interactive users.", ""));
children.push(bullet("Multithreading: Multiple threads of a SINGLE process run concurrently, sharing code, data, and heap but having separate stacks and registers. Goal: parallelism within one application (e.g., a browser loading a page while responding to clicks).", ""));
children.push(a("Key difference: Multiprogramming/Multitasking deal with MULTIPLE processes; Multithreading deals with MULTIPLE execution paths within ONE process."));
children.push(separator());

children.push(q("Q5. What are the types of Operating Systems? Explain with examples."));
children.push(bullet("Batch OS: Jobs collected in batches, executed without user interaction. No direct interaction between user and CPU. Example: Early IBM systems.", ""));
children.push(bullet("Time-Sharing OS: CPU shared among multiple users via time-slicing. Interactive, fast response. Example: Unix, Linux.", ""));
children.push(bullet("Real-Time OS (RTOS): Hard RTOS \u2014 strict deadlines (airbag, pacemaker). Soft RTOS \u2014 deadlines preferred but not fatal (video streaming).", ""));
children.push(bullet("Distributed OS: Multiple physically separate computers connected by a network appear as one system. Example: Google\u2019s infrastructure.", ""));
children.push(bullet("Network OS: Server-based, users login to server to access shared resources. Example: Windows Server.", ""));
children.push(bullet("Mobile OS: Designed for handheld devices. Battery-aware, touch UI. Example: Android, iOS.", ""));
children.push(separator());

children.push(q("Q6. What is a System Call? Explain its types with examples."));
children.push(a("A system call is the programmatic mechanism by which a user-space program requests a privileged service from the OS kernel. User programs run in user mode; to access hardware or OS resources, they must switch to kernel mode via a system call (trap/interrupt)."));
children.push(a("Types of system calls:"));
children.push(bullet("Process Control: fork() \u2014 create process, exec() \u2014 replace process image, exit() \u2014 terminate, wait() \u2014 wait for child.", "1."));
children.push(bullet("File Management: open(), read(), write(), close(), create(), delete().", "2."));
children.push(bullet("Device Management: ioctl(), read/write on device files.", "3."));
children.push(bullet("Information Maintenance: getpid(), alarm(), sleep(), time().", "4."));
children.push(bullet("Communication: pipe(), socket(), send(), recv(), shmget() (shared memory).", "5."));
children.push(a("Mode Switch: user mode \u2192 trap instruction \u2192 kernel mode \u2192 execute system call \u2192 return to user mode. This mode switch is expensive (overhead)."));
children.push(separator());

children.push(q("Q7. What are the different OS structures? Compare Monolithic vs Microkernel."));
children.push(bullet("Simple/Monolithic Structure: Entire OS in one large kernel. All services (process mgmt, memory, file system, device drivers) run in kernel space. Fast (no mode switching for services) but difficult to maintain, debug, and extend. Example: Original Unix, Linux.", ""));
children.push(bullet("Layered Structure: OS divided into layers \u2014 each layer only uses services of the layer below it. Easy to debug (test layer by layer) but performance overhead.", ""));
children.push(bullet("Microkernel: Only essential services (IPC, basic scheduling, memory mapping) in kernel space. Everything else (file system, device drivers) runs as user-space servers. More secure (a crashed driver doesn\u2019t crash the kernel), easier to port, but slower due to frequent IPC. Example: Mach, QNX.", ""));
children.push(bullet("Modular (Modern): Kernel has core components + loadable kernel modules (LKMs). Best of both worlds \u2014 flexible like microkernel, fast like monolithic. Example: Modern Linux (modules loaded with insmod/modprobe).", ""));
children.push(separator());

// ─── UNIT II ──────────────────────────────────────────────────────────────
children.push(pageBreak(), h2("Unit II \u2014 Process Management"));

children.push(q("Q1. What is a Process? Explain all its states and the state transition diagram."));
children.push(a("A process is a program in execution \u2014 it is the unit of work in an OS. A program is a passive entity (code on disk); a process is active (code + data + stack + PCB loaded in memory)."));
children.push(a("Five-state model:"));
children.push(bullet("New: Process is being created (resources being allocated, PCB initialized).", ""));
children.push(bullet("Ready: Process is loaded in memory, waiting for CPU. It is in the ready queue.", ""));
children.push(bullet("Running: Process is actually executing on the CPU. Only ONE process per CPU core can be in this state.", ""));
children.push(bullet("Waiting/Blocked: Process is waiting for an event (I/O completion, signal, semaphore). Cannot use CPU even if CPU is idle.", ""));
children.push(bullet("Terminated: Process has finished execution. Resources are being deallocated, PCB is removed.", ""));
children.push(a("Key transitions: New\u2192Ready (admitted), Ready\u2192Running (scheduler dispatch), Running\u2192Ready (preempted/time-out), Running\u2192Waiting (I/O request), Waiting\u2192Ready (I/O completion), Running\u2192Terminated (exit)."));
children.push(note("Two additional states in systems with swapping: Suspended-Ready (in disk, ready to run) and Suspended-Waiting (in disk, waiting for event)."));
children.push(separator());

children.push(q("Q2. What is a Process Control Block (PCB)? What does it contain?"));
children.push(a("A PCB (also called Task Control Block) is a data structure maintained by the OS for every process. It is the kernel\u2019s complete representation of a process. When a process is created, a PCB is allocated; when terminated, the PCB is freed."));
children.push(a("Contents of a PCB:"));
children.push(bullet("Process ID (PID): Unique identifier for the process.", ""));
children.push(bullet("Process State: New / Ready / Running / Waiting / Terminated.", ""));
children.push(bullet("Program Counter (PC): Address of the next instruction to execute.", ""));
children.push(bullet("CPU Registers: All register values (accumulators, index registers, stack pointer) \u2014 saved on context switch.", ""));
children.push(bullet("CPU Scheduling Info: Priority, scheduling queue pointers, time quantum used.", ""));
children.push(bullet("Memory Management Info: Base/limit registers, page table pointer, segment table.", ""));
children.push(bullet("I/O Status: List of open files, I/O devices allocated to the process.", ""));
children.push(bullet("Accounting Info: CPU time used, wall-clock time, time limits, job number.", ""));
children.push(separator());

children.push(q("Q3. What is Context Switching? What is saved and restored? Why is it expensive?"));
children.push(a("Context switching is the process of saving the full state (context) of the currently running process into its PCB and loading the saved state of the next process to run from its PCB. After a context switch, the new process resumes exactly where it left off."));
children.push(a("What is saved: Program Counter, all CPU registers, process state, memory management registers (page table base register). What is restored: same fields from the incoming process\u2019s PCB."));
children.push(a("Why expensive: During a context switch, the CPU does NO useful work \u2014 it is pure overhead. Additionally, the CPU cache (L1/L2) must be flushed and repopulated for the new process, causing cache misses. The TLB (Translation Lookaside Buffer) may also be flushed if the new process has a different address space."));
children.push(a("Context switch time: typically 1\u201310 microseconds. This is why thread switches (lighter \u2014 same address space, TLB not flushed) are faster than process switches."));
children.push(separator());

children.push(q("Q4. What is a Thread? How does it differ from a Process? What are Thread Models?"));
children.push(a("A thread is the smallest unit of CPU execution within a process. A process can have multiple threads, all sharing the process\u2019s code, data segment (global variables), heap, and open files. Each thread has its own: stack, registers, program counter, thread ID, and scheduling state."));
children.push(a("Process vs Thread:"));
children.push(bullet("Creation: Process creation is heavy (copy address space). Thread creation is lightweight (share existing space).", ""));
children.push(bullet("Communication: Processes communicate via IPC (pipes, sockets, shared memory). Threads share memory directly (faster but needs synchronization).", ""));
children.push(bullet("Fault isolation: A crashed process doesn\u2019t affect others. A crashed thread can crash the whole process.", ""));
children.push(a("Thread Models (many-to-one, one-to-one, many-to-many):"));
children.push(bullet("Many-to-One: Many user threads mapped to one kernel thread. Simple but if one blocks, all block (no true parallelism). Example: Green threads.", ""));
children.push(bullet("One-to-One: Each user thread has a kernel thread. True parallelism, but creating many threads is costly. Example: Windows, Linux (pthreads).", ""));
children.push(bullet("Many-to-Many: M user threads mapped to N kernel threads (M \u2265 N). Flexible \u2014 no blocking all, no overhead of one-to-one. Example: Solaris.", ""));
children.push(separator());

children.push(q("Q5. Explain all CPU Scheduling Algorithms. What are the evaluation criteria?"));
children.push(a("Evaluation criteria (maximize/minimize):"));
children.push(bullet("CPU Utilization: % of time CPU is busy (maximize, ideally 40\u201390%).", ""));
children.push(bullet("Throughput: Number of processes completed per unit time (maximize).", ""));
children.push(bullet("Turnaround Time: Total time from submission to completion (minimize). TAT = CT - AT.", ""));
children.push(bullet("Waiting Time: Total time spent in the ready queue (minimize). WT = TAT - BT.", ""));
children.push(bullet("Response Time: Time from submission to FIRST response (minimize) \u2014 important for interactive systems.", ""));
children.push(a("Algorithms:"));
children.push(bullet("FCFS: Simple, non-preemptive, no starvation but causes convoy effect.", ""));
children.push(bullet("SJF (NP): Minimum avg WT for given set but requires knowing burst time in advance. Can starve.", ""));
children.push(bullet("SRTF: Preemptive SJF. Optimal avg WT overall but heavy overhead and starvation risk.", ""));
children.push(bullet("Priority: Important jobs first. Starvation fixed by aging (gradually increase priority of waiting processes).", ""));
children.push(bullet("Round Robin: Time quantum-based, preemptive, fair, best response time. Performance depends on quantum size.", ""));
children.push(separator());

// ─── UNIT III ─────────────────────────────────────────────────────────────
children.push(pageBreak(), h2("Unit III \u2014 Process Synchronization & Deadlock Management"));

children.push(q("Q1. What is Race Condition? Give an example and explain the problem."));
children.push(a("A Race Condition occurs when two or more processes/threads access shared data concurrently and the final result depends on the order (timing/scheduling) of their execution. This leads to incorrect, unpredictable results."));
children.push(a("Classic example \u2014 Counter increment: Two threads both execute counter++ (which is NOT atomic: it compiles to LOAD, ADD, STORE). Suppose counter = 5. Thread 1 LOADs 5. Thread 2 LOADs 5. Thread 1 increments to 6 and STOREs. Thread 2 increments its local copy to 6 and STOREs. Final value: 6 instead of 7. One increment is LOST."));
children.push(a("Why it\u2019s dangerous: The bug is intermittent and hard to reproduce \u2014 it only occurs when threads happen to interleave at exactly the wrong moment, which is timing-dependent."));
children.push(separator());

children.push(q("Q2. What is the Critical Section Problem? What are the three requirements for a solution?"));
children.push(a("A Critical Section is a segment of code where a process accesses shared resources (shared memory, files, hardware). If two processes are in their critical sections simultaneously, a race condition occurs."));
children.push(a("Structure of a process with critical section: Entry Section (request permission) \u2192 Critical Section (shared resource access) \u2192 Exit Section (release) \u2192 Remainder Section (rest of code)."));
children.push(a("Three requirements that ANY valid solution must satisfy:"));
children.push(bullet("Mutual Exclusion: If process Pi is in its critical section, no other process may be in its critical section simultaneously.", "1."));
children.push(bullet("Progress: If no process is in the critical section and some processes want to enter, the selection of who enters next cannot be postponed indefinitely (the system must make progress).", "2."));
children.push(bullet("Bounded Waiting: There exists a bound on the number of times OTHER processes can enter their critical sections after a process has requested entry and before that request is granted (prevents starvation).", "3."));
children.push(separator());

children.push(q("Q3. Explain Peterson\u2019s Solution. Does it work on modern hardware?"));
children.push(a("Peterson\u2019s solution is a software-based algorithm for mutual exclusion between exactly TWO processes (P0 and P1) using two shared variables:"));
children.push(bullet("flag[2]: flag[i] = true means Pi WANTS to enter the critical section.", ""));
children.push(bullet("turn: indicates whose TURN it is to enter when both want to enter.", ""));
children.push(a("For Pi to enter: Set flag[i] = true; Set turn = j (give turn to the other); Wait while flag[j] == true AND turn == j. If the other process doesn\u2019t want to enter (flag[j] = false), Pi proceeds. If both want to enter, the one whose turn it is waits."));
children.push(a("It satisfies all three requirements: Mutual Exclusion (if both execute wait, only the one with turn proceeds), Progress (if one doesn\u2019t want to enter, the other proceeds immediately), Bounded Waiting (each process waits at most one turn)."));
children.push(note("On modern CPUs with out-of-order execution and compiler reordering, Peterson\u2019s solution may FAIL without memory barriers/fences. Modern OS uses hardware instructions like test-and-set or compare-and-swap instead."));
children.push(separator());

children.push(q("Q4. What is a Semaphore? Explain types, operations, and how it solves the critical section problem."));
children.push(a("A Semaphore is a non-negative integer variable accessed ONLY through two atomic operations: wait() [also called P or down] and signal() [also called V or up]. Its value represents the number of available resources."));
children.push(a("wait(S): If S > 0, decrement S (resource acquired). If S == 0, block the process (put in waiting queue)."));
children.push(a("signal(S): Increment S. If any process is blocked waiting on S, wake one up."));
children.push(a("Types:"));
children.push(bullet("Binary Semaphore (Mutex Semaphore): Can only be 0 or 1. Used for mutual exclusion. Initialize to 1. Process does wait() before critical section and signal() after. At most one process is in the critical section.", ""));
children.push(bullet("Counting Semaphore: Can range over an unrestricted domain. Used to control access to a resource pool with N instances. Initialize to N. Each wait() takes one instance, each signal() returns one.", ""));
children.push(a("How it solves the critical section: Initialize mutex = 1. Process: wait(mutex) \u2192 [critical section] \u2192 signal(mutex). Since wait() is atomic, no two processes can simultaneously decrement from 1 to 0 \u2014 mutual exclusion is guaranteed."));
children.push(note("Busy-waiting (spinlock) semaphores waste CPU. Blocking semaphores (with a waiting queue) are better for long critical sections. The problem of busy-waiting in wait() is solved by using block() and wakeup() system calls instead."));
children.push(separator());

children.push(q("Q5. What is Deadlock? State and explain all four necessary conditions (Coffman\u2019s Conditions)."));
children.push(a("Deadlock is a situation where a set of processes are ALL permanently blocked, each waiting for a resource held by another process in the set. No process can make progress."));
children.push(a("ALL four conditions must hold simultaneously for deadlock to occur:"));
children.push(bullet("Mutual Exclusion: At least one resource must be held in a non-shareable mode \u2014 only one process can use it at a time. (If resources were shareable, no deadlock.)", "1."));
children.push(bullet("Hold and Wait: A process is holding at least one resource AND waiting to acquire additional resources currently held by other processes.", "2."));
children.push(bullet("No Preemption: Resources cannot be forcibly taken from a process. They must be voluntarily released by the process holding them.", "3."));
children.push(bullet("Circular Wait: There exists a set {P1, P2, ..., Pn} such that P1 is waiting for P2, P2 for P3, ..., Pn is waiting for P1 \u2014 forming a cycle.", "4."));
children.push(note("Eliminating ANY ONE of these four conditions prevents deadlock. This is the basis of Deadlock Prevention."));
children.push(separator());

children.push(q("Q6. Compare Deadlock Prevention, Avoidance, Detection & Recovery."));
children.push(bullet("Prevention: Statically eliminate at least one of the four conditions. Example: No Hold-and-Wait (process must request ALL resources at once), or allow preemption (forcibly take resources). Disadvantage: Low resource utilization, conservative.", ""));
children.push(bullet("Avoidance: Allow requests dynamically but check using an algorithm (Banker\u2019s Algorithm) whether granting a request will keep the system in a safe state. If unsafe, deny. Requires knowing MAX resource needs in advance. Disadvantage: Overhead of running safety algorithm on every request.", ""));
children.push(bullet("Detection: Do NOT prevent or avoid. Let deadlock happen. Periodically run a detection algorithm (resource-allocation graph cycle detection or Wait-For graph). Disadvantage: Deadlock may persist for a while; recovery is disruptive.", ""));
children.push(bullet("Recovery from Deadlock: 1) Process Termination \u2014 abort one or more deadlocked processes (all at once, or one by one until deadlock resolved). 2) Resource Preemption \u2014 forcibly take resources from processes and give to others; requires rollback.", ""));
children.push(separator());

children.push(q("Q7. Explain Banker\u2019s Algorithm in detail \u2014 matrices, safety algorithm, and request algorithm."));
children.push(a("Banker\u2019s Algorithm (by Dijkstra) is a deadlock avoidance algorithm used when the number of processes and resource instances are fixed and known in advance."));
children.push(a("Matrices used (n processes, r resource types):"));
children.push(bullet("Allocation[n][r]: Resources currently allocated to each process.", ""));
children.push(bullet("Max[n][r]: Maximum resources each process may ever need.", ""));
children.push(bullet("Need[n][r] = Max[n][r] - Allocation[n][r]: Resources each process still needs.", ""));
children.push(bullet("Available[r]: Number of free instances of each resource type.", ""));
children.push(a("Safety Algorithm: 1) Initialize Work = Available, Finish[i] = false for all i. 2) Find a process i such that Finish[i] == false AND Need[i] <= Work. 3) If found: Work = Work + Allocation[i], Finish[i] = true, add i to safe sequence. Repeat from step 2. 4) If all Finish[i] == true: system is in a safe state. Otherwise: unsafe."));
children.push(a("Resource-Request Algorithm: When Pi requests Resources[]: 1) Check Request[i] <= Need[i] (else error). 2) Check Request[i] <= Available (else Pi must wait). 3) Tentatively allocate: Available -= Request[i], Allocation[i] += Request[i], Need[i] -= Request[i]. 4) Run safety algorithm. If safe: commit allocation. If unsafe: rollback."));
children.push(note("Limitation: Requires processes to declare maximum needs upfront, fixed number of processes/resources, and adds overhead to every resource request."));
children.push(separator());

children.push(q("Q8. Explain the Producer-Consumer Problem with semaphores. What happens if mutex is acquired before empty/full?"));
children.push(a("The Producer-Consumer (Bounded-Buffer) Problem: A producer creates items and inserts them into a shared buffer of size N. A consumer removes items. Problems to solve: Producer must not insert into a FULL buffer (overflow); Consumer must not remove from an EMPTY buffer (underflow); Both cannot access buffer SIMULTANEOUSLY (race condition)."));
children.push(a("Three semaphores: mutex = 1 (mutual exclusion for buffer access), empty = N (counts free slots, producer waits here when 0), full = 0 (counts filled slots, consumer waits here when 0)."));
children.push(a("Producer: wait(empty) \u2192 wait(mutex) \u2192 insert item \u2192 signal(mutex) \u2192 signal(full)."));
children.push(a("Consumer: wait(full) \u2192 wait(mutex) \u2192 remove item \u2192 signal(mutex) \u2192 signal(empty)."));
children.push(a("CRITICAL TRAP \u2014 if mutex is acquired BEFORE empty/full:"));
children.push(bullet("Producer does wait(mutex) then wait(empty). Buffer is full so empty = 0, producer blocks while HOLDING mutex.", ""));
children.push(bullet("Consumer tries wait(mutex) \u2014 blocked because producer holds it. Consumer can never signal(empty).", ""));
children.push(bullet("DEADLOCK: Producer waits for consumer to signal(empty), consumer waits for producer to release mutex.", ""));
children.push(a("This is why mutex MUST always be acquired AFTER empty/full (i.e., innermost wait)."));
children.push(separator());

// ─── UNIT IV ──────────────────────────────────────────────────────────────
children.push(pageBreak(), h2("Unit IV \u2014 Memory Management"));

children.push(q("Q1. Explain Paging in detail. Does it cause fragmentation? What is the role of Frames in RAM?"));
children.push(a("Paging is a memory management technique that eliminates external fragmentation by allowing a process\u2019s physical memory to be non-contiguous."));
children.push(a("Core concept: Logical (virtual) address space of a process is divided into fixed-size blocks called PAGES. Physical memory (RAM) is divided into fixed-size blocks called FRAMES. Page size = Frame size (typically 4KB). A PAGE TABLE maps each logical page number to a physical frame number."));
children.push(a("Role of Frames in RAM: Physical memory is divided into equal-sized partitions called frames. When a process needs a page loaded, the OS finds any FREE frame in RAM and loads the page into it. Frames can be scattered anywhere in physical memory \u2014 the page table handles the mapping transparently. This is why paging eliminates external fragmentation (any free frame can hold any page, no need for contiguous space)."));
children.push(a("Fragmentation analysis:"));
children.push(bullet("External Fragmentation: Does NOT occur in paging. Since any free frame can be assigned to any page, scattered free frames are all usable. There is no 'hole too small to use'.", ""));
children.push(bullet("Internal Fragmentation: DOES occur in paging. The last page of a process may not fill its entire frame. For example, if page size = 4KB and a process needs 13KB, it gets 4 pages = 16KB allocated but only uses 13KB. The last frame has 3KB wasted INSIDE the allocated area. This is internal fragmentation. On average, half a page is wasted per process.", ""));
children.push(a("Address translation: Logical address = (page number p, offset d). Physical address = frame number f (from page table[p]) * page size + d."));
children.push(a("Page table storage: Stored in main memory. Each memory access now requires 2 memory accesses (1 for page table, 1 for actual data). This overhead is solved by the TLB (see Q3)."));
children.push(separator());

children.push(q("Q2. What is Demand Paging? Explain page fault handling step by step."));
children.push(a("Demand Paging is a virtual memory technique where pages of a process are loaded into physical memory (RAM) ONLY when they are actually accessed (demanded), NOT all at once when the process starts. This allows running programs larger than physical RAM."));
children.push(a("A VALID bit (present bit) is added to each page table entry: 1 = page is in memory, 0 = page is on disk (not loaded yet)."));
children.push(a("Page Fault: When a process accesses a page whose valid bit = 0, the hardware generates a PAGE FAULT trap to the OS."));
children.push(a("Page Fault Handling Steps:"));
children.push(bullet("Step 1: Hardware detects valid bit = 0, raises page fault interrupt, traps to OS.", "1."));
children.push(bullet("Step 2: OS saves the process state (registers, PC).", "2."));
children.push(bullet("Step 3: OS checks if the reference is LEGAL (valid address for the process). If illegal, terminate process. If legal, continue.", "3."));
children.push(bullet("Step 4: OS finds a FREE frame in physical memory. If none available, run a PAGE REPLACEMENT algorithm to evict a victim page.", "4."));
children.push(bullet("Step 5: OS schedules a disk read (disk I/O) to load the required page from swap space/disk into the free frame.", "5."));
children.push(bullet("Step 6: While waiting for disk I/O, OS switches to another process (CPU is not wasted).", "6."));
children.push(bullet("Step 7: When disk I/O completes (interrupt), OS updates the page table entry (set frame number, set valid bit = 1).", "7."));
children.push(bullet("Step 8: OS restarts the instruction that caused the page fault. The process continues as if nothing happened.", "8."));
children.push(a("Pure demand paging: Start process with NO pages in memory. First instruction immediately causes a page fault. Each page is loaded only when first needed. This maximizes memory efficiency but increases startup latency."));
children.push(note("Page fault rate p (0 \u2264 p \u2264 1): Effective Access Time = (1-p) \u00d7 memory access time + p \u00d7 (page fault overhead + swap-in time + restart overhead). A high page fault rate drastically degrades performance."));
children.push(separator());

children.push(q("Q3. What is TLB? How does it improve performance? Calculate Effective Access Time."));
children.push(a("Translation Lookaside Buffer (TLB) is a small, extremely fast hardware cache (typically 64\u2013512 entries) that stores RECENT page table entries. It is part of the CPU memory management unit (MMU)."));
children.push(a("Without TLB: Every memory access requires 2 memory accesses (1 for page table in RAM, 1 for actual data). If memory access = 100ns, effective time = 200ns. This doubles every memory access!"));
children.push(a("With TLB:"));
children.push(bullet("TLB Hit (page number found in TLB): Physical address obtained directly. Only 1 memory access for data. Time = TLB lookup time (10ns) + memory access (100ns) = 110ns.", ""));
children.push(bullet("TLB Miss (not in TLB): Page table accessed from memory (100ns) + data access (100ns) + TLB update. Time = 210ns.", ""));
children.push(a("Effective Access Time (EAT) = \u03b1 \u00d7 (TLB time + memory time) + (1-\u03b1) \u00d7 (TLB time + 2 \u00d7 memory time), where \u03b1 = hit ratio (typically 0.90\u20130.99)."));
children.push(a("Example: TLB time = 10ns, memory = 100ns, hit ratio \u03b1 = 0.90. EAT = 0.9 \u00d7 110 + 0.1 \u00d7 210 = 99 + 21 = 120ns. Compare to 200ns without TLB \u2014 40% improvement!"));
children.push(a("TLB and context switching: When a process switch occurs, TLB entries may belong to the old process. Either the TLB is flushed (invalidated) on every context switch (costly) or ASIDs (Address Space Identifiers) tag each TLB entry with the process ID, allowing entries from multiple processes to coexist."));
children.push(separator());

children.push(q("Q4. What is Segmentation? How does it differ from Paging? What fragmentation does it cause?"));
children.push(a("Segmentation is a memory management scheme that divides a program into LOGICAL units called segments \u2014 each corresponding to a programmer-visible entity: code segment, data segment, stack segment, heap segment, etc. Segments have VARIABLE sizes (unlike fixed-size pages)."));
children.push(a("Segment Table: Each entry has a base (starting physical address of segment) and a limit (length of segment). Physical address = base + offset (offset must be < limit, else segmentation fault)."));
children.push(a("Fragmentation analysis:"));
children.push(bullet("External Fragmentation: YES. Segments vary in size. As segments are loaded/removed, gaps form in memory that may be too small for new segments. Compaction needed to combine free space.", ""));
children.push(bullet("Internal Fragmentation: NO. Segments are exactly the size the program needs \u2014 no wasted space inside an allocated segment.", ""));
children.push(a("Paging vs Segmentation:"));
children.push(refTable([
  ["Unit", "Paging: Fixed-size pages | Segmentation: Variable-size segments"],
  ["Programmer visible?", "No (transparent) | Yes (code/data/stack)"],
  ["External Fragmentation", "None | Yes"],
  ["Internal Fragmentation", "Yes (last page) | None"],
  ["Address", "Page no. + offset | Segment no. + offset"],
]));
children.push(a("Modern systems (e.g., x86) use Segmentation + Paging: segments divide the address space logically, paging handles physical allocation."));
children.push(separator());

children.push(q("Q5. What is Virtual Memory? What is Thrashing and how is it solved?"));
children.push(a("Virtual Memory is a memory management technique that gives each process the illusion of having a large, dedicated address space (e.g., 4GB on 32-bit) even if physical RAM is only 512MB. Pages not currently needed are stored on disk (swap space). Only active pages reside in RAM."));
children.push(a("Benefits: Allows programs larger than physical RAM to execute. More processes can be multiprogrammed. Processes are isolated (each has its own virtual address space). Simplifies programming (contiguous virtual addresses even if physical frames are scattered)."));
children.push(a("Thrashing: Occurs when the CPU spends more time handling page faults than executing useful instructions. Cause: A process does not have enough frames to hold its WORKING SET (the set of pages actively used). It page-faults constantly; as the OS is busy doing disk I/O, CPU utilization drops; OS responds by adding more processes (thinking CPU is underutilized); this makes things WORSE (even fewer frames per process)."));
children.push(a("Diagram: As degree of multiprogramming increases, CPU utilization rises, then suddenly collapses when thrashing begins."));
children.push(a("Solutions to Thrashing:"));
children.push(bullet("Working Set Model: Track the working set of each process (pages used in the last \u0394 time units). Allocate at least that many frames. If total working set > available frames, suspend some processes.", "1."));
children.push(bullet("Page Fault Frequency (PFF) Control: If PFF too high (process needs more frames), allocate more. If PFF too low, take back frames. Suspend a process if no free frames available.", "2."));
children.push(bullet("Simply add more physical RAM.", "3."));
children.push(separator());

children.push(q("Q6. Explain the three Page Replacement Algorithms \u2014 FIFO, LRU, Optimal. What is Belady\u2019s Anomaly?"));
children.push(a("When a page fault occurs and no free frame exists, the OS must SELECT a victim page to evict (replace). The page replacement algorithm makes this choice."));
children.push(a("FIFO (First-In-First-Out): Replace the page that has been in memory the LONGEST. Easy to implement (queue). Problem: May evict a frequently used page just because it was loaded early. Suffers BELADY'S ANOMALY."));
children.push(a("LRU (Least Recently Used): Replace the page that has NOT been used for the LONGEST time. Based on temporal locality \u2014 recently used pages are likely to be used again. Does NOT suffer Belady\u2019s anomaly. Expensive to implement exactly (need to timestamp every memory access). Approximated in real OS using reference bits or the clock algorithm."));
children.push(a("Optimal: Replace the page that will NOT be used for the LONGEST time in the FUTURE. Theoretically minimum page faults. CANNOT be implemented (future is unknown). Used as a benchmark to evaluate other algorithms."));
children.push(a("Comparison: Optimal < LRU \u2264 FIFO in terms of page faults (Optimal always best). But only FIFO and LRU approximations are practical."));
children.push(a("Belady\u2019s Anomaly: For FIFO, increasing the number of page frames can sometimes INCREASE the number of page faults. This is counter-intuitive. Example: Reference string 1,2,3,4,1,2,5,1,2,3,4,5 with 3 frames: 9 faults; with 4 frames: 10 faults. LRU and Optimal do NOT exhibit this (they are stack algorithms \u2014 the set of pages in n+1 frames is always a superset of those in n frames)."));
children.push(separator());

// ─── UNIT V ───────────────────────────────────────────────────────────────
children.push(pageBreak(), h2("Unit V \u2014 File and I/O Management"));

children.push(q("Q1. What is a File System? Explain File Access Methods."));
children.push(a("A File System is the OS component responsible for organizing, storing, retrieving, naming, and protecting files on storage devices. It provides an abstraction: instead of dealing with raw disk sectors, programs work with named files and directories."));
children.push(a("File Access Methods:"));
children.push(bullet("Sequential Access: Data is read/written in order from beginning to end. Most common (used for text files, streams). Cannot jump to a specific record without reading everything before it. Example: Audio/video streaming, compiler reading source files.", "1."));
children.push(bullet("Direct (Random) Access: Any record can be accessed directly by its position (block number). The file is viewed as a numbered sequence of fixed-size records. Can read/write record n directly. Example: Databases where any row can be fetched directly.", "2."));
children.push(bullet("Indexed Access: An index file contains the key and pointer to each record in the main file. To find a record, search the index first, then jump to the location. Example: B-tree indexed database files.", "3."));
children.push(separator());

children.push(q("Q2. What are the File Allocation Methods? Compare their fragmentation and performance."));
children.push(a("File Allocation determines how disk blocks are assigned to files:"));
children.push(bullet("Contiguous Allocation: All blocks of a file stored in consecutive disk blocks. Fast sequential and direct access (one seek). Simple (only store start block + length). Problems: External fragmentation (free space becomes fragmented), difficult to grow files (no room to extend).", "1."));
children.push(bullet("Linked Allocation: Each block contains a pointer to the next block. Blocks can be scattered anywhere. No external fragmentation. Easy to grow files. Problems: Sequential access only (must follow chain), random access is slow (must traverse chain from start), one lost pointer corrupts entire file. FAT (File Allocation Table) is an improvement (pointers in separate table).", "2."));
children.push(bullet("Indexed Allocation: An index block contains an array of pointers to all data blocks of the file. No external fragmentation. Supports direct access (find block i in index). Problem: Index block overhead (even small files need an index block). Large files need multiple index blocks (multi-level indexing, e.g., Unix inode structure with direct, single-indirect, double-indirect, triple-indirect pointers).", "3."));
children.push(separator());

children.push(q("Q3. Explain all 6 Disk Scheduling Algorithms with movement calculation. When is each preferred?"));
children.push(a("Disk scheduling determines the ORDER in which pending disk I/O requests are serviced to minimize total seek time (arm movement). Given: head position H, request queue, disk size D."));
children.push(bullet("FCFS: Service in order of arrival. Fair, simple, no starvation. Inefficient \u2014 head may move back and forth wildly. Best when load is light.", "1."));
children.push(bullet("SSTF (Shortest Seek Time First): Always service the closest request. Better average seek time than FCFS. Problem: Starvation of faraway requests. Best when requests are clustered.", "2."));
children.push(bullet("SCAN (Elevator): Head moves in one direction, services ALL requests in that direction, goes to disk END, reverses. No starvation. Requests at far end wait longest. Best for moderate loads.", "3."));
children.push(bullet("C-SCAN (Circular SCAN): Like SCAN but only services requests in ONE direction (usually upward). At disk end, jumps back to cylinder 0 (no service on return). More UNIFORM waiting time than SCAN. Treats disk as circular.", "4."));
children.push(bullet("LOOK: Like SCAN but head only goes as far as the LAST REQUEST in each direction (does not travel to disk boundary). More efficient than SCAN \u2014 no wasted travel.", "5."));
children.push(bullet("C-LOOK: Like C-SCAN but jumps from the last request (not disk end) to the smallest pending request (not cylinder 0). Most efficient of the SCAN family. Best for heavy, uniform loads.", "6."));
children.push(a("Movement calculation: For each algorithm, track the sequence of cylinders visited and sum up |difference| between consecutive positions. This total = total head movement = measure of efficiency."));
children.push(note("Linux uses a variant called CFQ (Completely Fair Queuing) or the 'deadline' scheduler which combines LOOK with fairness and deadline guarantees."));
children.push(separator());

children.push(q("Q4. What are disk access time components? How does disk scheduling reduce them?"));
children.push(a("Total Disk Access Time = Seek Time + Rotational Latency + Transfer Time:"));
children.push(bullet("Seek Time: Time for the disk arm to move to the correct TRACK. This is the dominant, most variable component (varies from ~2ms to 20ms). Disk scheduling algorithms minimize this.", "1."));
children.push(bullet("Rotational Latency: Time for the disk platter to rotate until the target SECTOR is under the read/write head. Average = time for half rotation. For 7200 RPM: one rotation = 60/7200 = 8.33ms; average latency = 4.17ms. Cannot be reduced by disk scheduling (depends on disk speed).", "2."));
children.push(bullet("Transfer Time: Time to actually read/write the data as sectors pass under the head. Usually very small (proportional to amount of data). Cannot be reduced by scheduling.", "3."));
children.push(a("Disk scheduling reduces SEEK TIME (the largest component) by optimizing the ORDER of requests to minimize total arm movement."));
children.push(separator());

// ─── UNIT VI ──────────────────────────────────────────────────────────────
children.push(pageBreak(), h2("Unit VI \u2014 Special-purpose Operating Systems"));

children.push(q("Q1. What is a Distributed OS? What are its key characteristics and challenges?"));
children.push(a("A Distributed OS manages a collection of independent computers connected by a network and makes them appear to users as a single, unified system. Each node has its own local memory (NO shared memory unlike multiprocessor systems)."));
children.push(a("Key characteristics: Resource sharing (files, printers, processors), fault tolerance (system continues if one node fails), scalability (add more nodes), transparency (user does not need to know which node serves them), concurrency."));
children.push(a("Challenges: Lack of shared memory (communication via message passing), network failures (partial failures are hard to handle), clock synchronization (no global clock), security (data transmitted over network), consistency (multiple copies of data must stay synchronized)."));
children.push(separator());

children.push(q("Q2. What is a Real-Time OS? Distinguish between Hard and Soft RTOS with examples."));
children.push(a("A Real-Time OS (RTOS) guarantees that critical operations are completed within strict time constraints (deadlines). Correctness depends not only on logical result but also on the TIME at which results are produced."));
children.push(bullet("Hard RTOS: Missing a deadline is a CATASTROPHIC FAILURE. The system MUST respond within the deadline, without exception. Schedules tasks with this as primary criterion. Examples: Airbag systems (miss by 1ms = no airbag), pacemakers, aircraft control systems, nuclear plant controllers.", ""));
children.push(bullet("Soft RTOS: Missing a deadline degrades QUALITY but is not catastrophic. The system tries to meet deadlines but occasional misses are tolerable. Examples: Video streaming (missed frame = glitch), online gaming, multimedia applications.", ""));
children.push(a("Key RTOS scheduling: Priority-based preemptive scheduling with predictable worst-case execution times (WCET). Rate-Monotonic Scheduling (RMS) and Earliest Deadline First (EDF) are common RTOS scheduling algorithms."));
children.push(separator());

children.push(q("Q3. What is a Mobile OS? What features make it different from a desktop OS?"));
children.push(a("A Mobile OS is designed specifically for mobile devices (smartphones, tablets). Examples: Android (based on Linux kernel), iOS (based on Darwin/XNU Unix kernel)."));
children.push(a("Special features compared to desktop OS:"));
children.push(bullet("Power Management: Aggressively manages CPU frequency (DVFS), screen brightness, radio states. Processes are frozen or killed when in background to save battery.", ""));
children.push(bullet("Touch Interface: Entirely gesture-based (tap, swipe, pinch-zoom). No mouse/keyboard assumed.", ""));
children.push(bullet("App Sandboxing: Each app runs in its own isolated sandbox (separate user ID in Android). Cannot access other apps\u2019 data without explicit permission.", ""));
children.push(bullet("Push Notifications: Maintain persistent connection to servers to receive notifications without apps running constantly.", ""));
children.push(bullet("Location Services: GPS, cell tower, Wi-Fi positioning integrated at OS level.", ""));
children.push(bullet("App Store Model: Apps distributed through centralized, curated stores (Play Store, App Store) with signing and verification.", ""));
children.push(separator());

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — PRACTICAL-WISE
// ══════════════════════════════════════════════════════════════════════════════
children.push(pageBreak(), h1("SECTION 2 \u2014 Practical-wise Viva Q&A"), separator());

const practicals = [
  { title: "Practical 1 \u2014 FCFS Scheduling (Arrival Time = 0)", file: "fcfs.c",
    overview: "First Come First Served: Processes are executed in the exact order they arrive. Since arrival time = 0, the input order IS the execution order.",
    algo: [
      "Sort processes by arrival time (already done since all AT=0).",
      "WT[0] = 0 (first process waits for nothing).",
      "WT[i] = WT[i-1] + BT[i-1] (each process waits for all previous to finish).",
      "TAT[i] = WT[i] + BT[i] (turnaround = waiting + execution).",
      "Average WT = Sum(WT) / n, Average TAT = Sum(TAT) / n.",
    ],
    formulas: [["WT[i]","WT[i-1] + BT[i-1]"],["TAT[i]","WT[i] + BT[i]"],["CT[i]","WT[i] + BT[i] (since AT=0)"]],
    vivaQs: [
      { q: "What is the Convoy Effect in FCFS?",
        a: "The convoy effect occurs when a long CPU-bound process occupies the CPU and a queue of short processes builds up behind it waiting. Each short process must wait for the entire long process to complete, resulting in very high average waiting time. Analogy: a slow truck in a single-lane tunnel causing a long queue of fast cars. FCFS is most vulnerable to this." },
      { q: "Is FCFS preemptive or non-preemptive? Can it be made preemptive?",
        a: "FCFS is inherently NON-preemptive. Once a process starts running, it runs until it finishes (or blocks for I/O). It cannot be made preemptive in a meaningful way \u2014 adding preemption to FCFS would require a criterion for when to preempt (which would make it a different algorithm like Round Robin or SRTF)." },
      { q: "What is the best case and worst case for FCFS average waiting time?",
        a: "Best case: Processes arrive in order of INCREASING burst time (shortest first). This gives minimum average WT for FCFS. Worst case: Processes arrive in order of DECREASING burst time (longest first) \u2014 maximum convoy effect, maximum average WT. Note: SJF produces the optimal average WT, which equals the FCFS best case." },
      { q: "What are the advantages of FCFS despite its poor performance?",
        a: "Simple to implement (just a FIFO queue), no starvation (every process eventually gets served), fair in the sense that every process is treated equally regardless of burst time, and no parameters to tune. Used in batch processing systems where response time is not critical." },
    ]
  },
  { title: "Practical 2 \u2014 Non-Preemptive Priority Scheduling", file: "priority_np.c",
    overview: "Among all processes that have arrived, the one with the HIGHEST priority (lowest priority number in our convention) is scheduled next. Once started, runs to completion (non-preemptive).",
    algo: [
      "At each scheduling decision point, scan all arrived and unfinished processes.",
      "Pick the one with the lowest priority number (highest priority).",
      "Run it fully (non-preemptive). Update current time by adding its burst time.",
      "CT[i] = time after process i finishes. TAT[i] = CT[i] - AT[i]. WT[i] = TAT[i] - BT[i].",
      "If no process has arrived yet, advance time to the earliest arriving process.",
    ],
    formulas: [["CT[i]","Current time after process i finishes"],["TAT[i]","CT[i] - AT[i]"],["WT[i]","TAT[i] - BT[i]"]],
    vivaQs: [
      { q: "What is Starvation in Priority Scheduling and how does Aging solve it?",
        a: "Starvation: A low-priority process may wait indefinitely because there is always a higher-priority process ready to run. In systems with continuous high-priority input, a low-priority process may NEVER execute. Aging Solution: Gradually increase the priority of a process the longer it has been waiting in the ready queue. For example, increase priority by 1 every 15 minutes. Eventually, even the lowest-priority process becomes the highest priority and gets served. This prevents starvation while maintaining priority ordering for newly arrived processes." },
      { q: "What happens when two processes have the same priority?",
        a: "When two processes have identical priority, we use a TIE-BREAKING rule. The most common is to apply FCFS among processes with equal priority (whichever arrived first gets served first). Our program uses index order as tie-breaking. In real systems, the tie-breaking rule matters for fairness." },
      { q: "What is the difference between Preemptive and Non-Preemptive Priority scheduling?",
        a: "Non-Preemptive: When a process starts, it runs to completion even if a higher-priority process arrives during its execution. The new process joins the ready queue and waits. Preemptive Priority: If a newly arrived process has higher priority than the RUNNING process, the running process is immediately preempted (stopped), moved to the ready queue, and the higher-priority process starts running. Preemptive Priority gives better response time for high-priority processes but has more context switch overhead." },
      { q: "Give a real-world analogy for priority scheduling.",
        a: "An emergency room in a hospital: Patients are prioritized by severity (priority). A patient with a minor cut (low priority) waits while patients with heart attacks (high priority) are served first. Non-preemptive: A doctor finishes treating the current patient before taking the next (even if someone more urgent arrives). Preemptive: The doctor stops mid-treatment to attend to an emergency (like surgery being interrupted for a life-threatening case)." },
    ]
  },
  { title: "Practical 3 \u2014 Preemptive SJF (SRTF \u2014 Shortest Remaining Time First)", file: "sjf_preemptive.c",
    overview: "At every clock tick, the arrived process with the SMALLEST remaining burst time is given the CPU. If a new process arrives with a shorter remaining time than the currently running process, the current process is preempted.",
    algo: [
      "Simulate time tick by tick (time = 0, 1, 2, ...).",
      "At each tick: among all arrived (AT <= time) and unfinished (rem[i] > 0) processes, pick the one with minimum remaining time.",
      "If no process available, advance time (CPU idle).",
      "Decrement rem[selected] by 1.",
      "When rem[i] reaches 0: CT[i] = current time + 1. TAT[i] = CT[i] - AT[i]. WT[i] = TAT[i] - BT[i].",
    ],
    formulas: [["rem[i]","Initially = BT[i]; decremented each tick"],["CT[i]","Time when rem[i] reaches 0"],["TAT[i]","CT[i] - AT[i]"],["WT[i]","TAT[i] - BT[i]"]],
    vivaQs: [
      { q: "Why is SRTF called the optimal scheduling algorithm?",
        a: "SRTF provably achieves the MINIMUM average waiting time among all possible scheduling algorithms for a given set of processes with known burst times. The proof is by exchange argument: if we have a schedule where a longer job runs before a shorter one, swapping them reduces total waiting time. SRTF always makes the locally optimal choice at every tick, which happens to be globally optimal." },
      { q: "What is the major practical disadvantage of SRTF?",
        a: "SRTF requires knowing the BURST TIME of each process in advance, which is generally impossible in real systems. Processes do not declare how long they will run. In practice, burst time is ESTIMATED using exponential averaging of past burst times (aging estimate). Also, SRTF can STARVE long processes if a continuous stream of short processes keeps arriving. Frequent preemptions also cause high context-switch overhead." },
      { q: "How does SRTF differ from SJF non-preemptive?",
        a: "SJF (NP): Once a process starts, it runs to completion regardless of new arrivals. SRTF: A new arrival can immediately preempt if its remaining time < current process's remaining time. SRTF is always better or equal to SJF NP in terms of average WT. With AT=0 for all, SJF NP = SRTF (since all arrive at same time, no preemption occurs after the first selection)." },
      { q: "What is the difference between remaining time and burst time in SRTF?",
        a: "Burst Time (BT): Total CPU time the process needs from start to finish. Remaining Time (rem): CPU time the process still needs to complete. rem = BT initially, and decreases by 1 every clock tick the process runs. SRTF schedules based on REMAINING time, not original burst time. A process that started with BT=10 but has already run for 7 ticks has rem=3, and should be treated as a 3-unit job." },
    ]
  },
  { title: "Practical 4 \u2014 Non-Preemptive SJF (Arrival Time = 0)", file: "sjf_np.c",
    overview: "Since all processes arrive at time 0, sorting by burst time and applying FCFS gives the optimal non-preemptive schedule. The process with the shortest burst time runs first.",
    algo: [
      "Read all burst times.",
      "Sort processes by burst time in ascending order (selection sort in our implementation).",
      "Apply FCFS on the sorted list: WT[0]=0, WT[i] = WT[i-1] + BT[i-1].",
      "TAT[i] = WT[i] + BT[i].",
      "Compute averages.",
    ],
    formulas: [["WT[i] (after sort)","WT[i-1] + BT[i-1]"],["TAT[i]","WT[i] + BT[i]"]],
    vivaQs: [
      { q: "Why does sorting by burst time give minimum average waiting time when AT=0?",
        a: "Proof: Given n processes with burst times b1, b2, ..., bn. WT[i] = b1+b2+...+b(i-1). Total WT = (n-1)b1 + (n-2)b2 + ... + 0*bn. To minimize this weighted sum (where shorter processes have higher weights), we must sort in ascending order \u2014 smallest burst time gets the largest weight (n-1). This is the SJF optimality theorem." },
      { q: "What if two processes have the same burst time?",
        a: "FCFS tie-breaking: among processes with equal burst time, the one with the smaller process ID (or whichever arrived first if arrival times differ) is served first. The average waiting time is the same regardless of tie-breaking order when burst times are equal, but individual process waiting times differ." },
      { q: "Can SJF cause starvation with AT=0?",
        a: "With AT=0 and a fixed set of processes: NO starvation, because all processes are available at t=0 and SJF simply serves them in ascending burst order. Once started, the queue is fixed. However, in a system with ongoing arrivals (processes keep arriving), SJF CAN starve long processes indefinitely if short processes keep arriving." },
    ]
  },
  { title: "Practical 5 \u2014 Round Robin Scheduling", file: "round_robin.c",
    overview: "Each process gets the CPU for a maximum of Q time units (time quantum). If it finishes within Q, it releases voluntarily. If not, it is preempted and placed at the back of the ready queue. Designed for fair, time-sharing systems.",
    algo: [
      "For each process in circular order: run for min(remaining, quantum) time units.",
      "During this run, all OTHER processes with remaining > 0 accumulate waiting time equal to this run.",
      "Subtract the run time from the current process's remaining time.",
      "If remaining = 0, process is done. Otherwise, it goes back to end of queue.",
      "TAT[i] = WT[i] + BT[i]. Average WT and TAT computed normally.",
    ],
    formulas: [["Time slice per turn","min(remaining[i], quantum)"],["WT[j] increment","time slice (for all j \u2260 i with rem[j]>0)"],["TAT[i]","WT[i] + BT[i]"]],
    vivaQs: [
      { q: "What is the effect of time quantum on Round Robin performance?",
        a: "Time quantum (Q) is the most critical parameter. Very small Q: Every process gets tiny slices. Context switches become very frequent, so CPU wastes most time on context switching overhead rather than useful work. Throughput drops. Very large Q: Processes rarely get preempted. RR degenerates to FCFS behavior. No preemption benefit. Optimal Q: Large enough that most I/O bursts complete in one quantum (reducing context switches), small enough for good response time. In practice: 10\u2013100 milliseconds is typical." },
      { q: "Is Round Robin suitable for a real-time system?",
        a: "NO. Real-time systems require predictable, deadline-driven scheduling. Round Robin gives each process equal CPU time regardless of urgency or deadlines. A high-priority real-time task must wait through the full queue before getting CPU again. This unpredictability makes RR unsuitable for hard RTOS. RR is designed for TIME-SHARING (interactive) systems where fairness and response time matter, not deadline guarantee." },
      { q: "What happens when a new process arrives mid-quantum in Round Robin?",
        a: "In most implementations, a newly arrived process is added to the END of the ready queue. It must wait for the current quantum to finish and then wait for all processes ahead of it in the queue. Some implementations add it to the FRONT of the queue (for better response time for new processes), but this can cause issues if not handled carefully." },
      { q: "Compare Round Robin with FCFS and SJF on average waiting time.",
        a: "For most input sets: SJF NP < Round Robin \u2264 FCFS in average WT. SJF is optimal. FCFS has convoy effect (long processes block short ones). RR is intermediate \u2014 no process waits more than (n-1)*Q time, but processes may complete much later than their actual burst time due to fragmented execution. RR has the BEST response time (time to first response) among all, making it ideal for interactive workloads." },
    ]
  },
  { title: "Practical 6 \u2014 Best Fit Memory Allocation", file: "best_fit.c",
    overview: "For each process, search ALL memory blocks and allocate the SMALLEST block that can still fit the process. Minimizes wasted space per allocation but may create many tiny unusable fragments over time.",
    algo: [
      "For each process (size = psize[i]):",
      "Scan all blocks. If block[j] >= psize[i] AND block[j] is smaller than the current best: update best = j.",
      "After scanning all: if best != -1, allocate: block[best] -= psize[i]; alloc[i] = best+1.",
      "If no suitable block found: process gets 'Not Allocated'.",
    ],
    formulas: [["Fragmentation after","block[j] - psize[i] (remaining in that block)"]],
    vivaQs: [
      { q: "Why is Best Fit not always the best in practice?",
        a: "Despite its name, Best Fit often performs WORSE than First Fit in practice. Because it always picks the tightest fit, it creates many very small leftover fragments that are too small to be useful for any future process (external fragmentation with tiny holes everywhere). Best Fit also requires scanning the ENTIRE list of blocks for every allocation (O(n) per allocation), making it slower than First Fit (which stops at the first suitable block)." },
      { q: "What type of fragmentation do memory allocation algorithms cause?",
        a: "External Fragmentation: Free memory exists in total, but it is split into small non-contiguous holes. No single hole is large enough for a new request, even though the total free memory might be sufficient. All three algorithms (First, Best, Worst Fit) can cause external fragmentation. Internal Fragmentation: Allocated block is larger than needed (the leftover inside the block is wasted). Best Fit minimizes per-allocation internal fragmentation since it picks the tightest fit." },
      { q: "How can external fragmentation be solved?",
        a: "1) Compaction: Move all allocated blocks together to create one large free hole. Expensive (requires relocating processes). 2) Paging: Use fixed-size frames so any free frame can hold any page \u2014 eliminates external fragmentation entirely. 3) Segmentation with paging (combined): Logical segments, physical paging. Practically, modern OS uses paging to avoid the fragmentation issues of contiguous allocation." },
    ]
  },
  { title: "Practical 7 \u2014 Worst Fit Memory Allocation", file: "worst_fit.c",
    overview: "For each process, allocate the LARGEST available block. The rationale: leaving a large leftover hole is better than leaving a tiny unusable hole.",
    algo: [
      "For each process (size = psize[i]):",
      "Scan all blocks. If block[j] >= psize[i] AND block[j] is LARGER than current worst: update worst = j.",
      "Allocate: block[worst] -= psize[i]; alloc[i] = worst+1.",
      "If no block fits: process gets 'Not Allocated'.",
    ],
    formulas: [["Fragmentation after","block[j] - psize[i] (large remainder)"]],
    vivaQs: [
      { q: "When is Worst Fit theoretically better than Best Fit?",
        a: "Worst Fit is theoretically better when processes have similar sizes and you want large remaining holes to accommodate future processes of similar sizes. By leaving large remainders, Worst Fit ensures that the leftover space is still large enough to be useful. Best Fit\u2019s tiny remainders may be useless. However, empirical studies show neither consistently outperforms the other \u2014 performance depends heavily on the specific request pattern." },
      { q: "Compare all three allocation strategies in one answer.",
        a: "First Fit: Stop at first suitable block. FASTEST (O(1) to O(n) average). Causes fragmentation at beginning of memory. Best Fit: Smallest suitable block. SLOWEST (always O(n)). Minimum per-allocation waste but creates many tiny holes. Worst Fit: Largest suitable block. SLOWEST (always O(n)). Large remainders but wastes large blocks on small requests. CONCLUSION: First Fit is usually the best overall performer in practice due to speed and acceptable fragmentation." },
    ]
  },
  { title: "Practical 8 \u2014 First Fit Memory Allocation", file: "first_fit.c",
    overview: "For each process, scan blocks from the BEGINNING and allocate the FIRST block large enough to hold the process. Fastest algorithm \u2014 stops immediately upon finding a suitable block.",
    algo: [
      "For each process (size = psize[i]):",
      "Scan blocks from index 0. If block[j] >= psize[i]: allocate immediately. block[j] -= psize[i]; alloc[i] = j+1; break.",
      "If no block found: process gets 'Not Allocated'.",
    ],
    formulas: [["Fragmentation","block[j] - psize[i] after allocation"]],
    vivaQs: [
      { q: "Why is First Fit generally preferred over Best Fit and Worst Fit?",
        a: "Speed: First Fit stops at the first suitable block \u2014 O(1) to O(n) but terminates early. Best/Worst always scan ALL blocks O(n). Comparable fragmentation: Studies show First Fit and Best Fit have similar external fragmentation in practice. Simplicity: Easy to implement, easy to understand. The small performance edge of Best Fit (slightly less internal fragmentation per allocation) does not justify its extra computation cost in most scenarios." },
      { q: "What is the Next Fit variant and how does it differ from First Fit?",
        a: "Next Fit: Instead of always starting the search from the beginning of the block list, Next Fit starts from where the PREVIOUS search left off (a roving pointer). This distributes allocations more evenly across memory (avoids always using blocks at the start). Advantage: Slightly less fragmentation at memory start. Disadvantage: May miss usable blocks at the beginning. First Fit tends to cluster small holes at the start and leave larger holes at the end; Next Fit spreads holes more evenly." },
    ]
  },
  { title: "Practical 9 \u2014 FIFO Page Replacement", file: "fifo_page.c",
    overview: "When a page fault occurs and all frames are full, replace the page that has been in memory the LONGEST (the oldest resident page). Implemented using a circular queue where the front pointer always points to the oldest page.",
    algo: [
      "Maintain a circular queue of frames. front pointer = oldest page's position.",
      "For each page reference: if page is already in a frame (hit), no action.",
      "If page not in any frame (fault): replace frame[front] with new page. Advance front = (front+1) % frames. Count fault.",
    ],
    formulas: [["Page Fault Rate","Total Faults / Total References"],["Hit Rate","1 - Page Fault Rate"]],
    vivaQs: [
      { q: "Explain Belady's Anomaly with a concrete example.",
        a: "Belady\u2019s Anomaly: For FIFO, more frames can cause MORE page faults. Example: Reference string 1,2,3,4,1,2,5,1,2,3,4,5. With 3 frames: 9 page faults. With 4 frames: 10 page faults! Adding one frame INCREASED faults by 1. This happens because with 4 frames, the set of pages in memory is different from 3 frames at critical moments, causing more misses. LRU and Optimal do NOT have this anomaly (they are stack algorithms)." },
      { q: "Why does FIFO not use the actual usage pattern of pages?",
        a: "FIFO is completely oblivious to how frequently or recently pages are used. It only tracks WHEN a page was loaded. A page loaded at t=0 that has been accessed every tick since will be evicted before a page loaded at t=1 that has never been accessed again. This makes FIFO inefficient \u2014 it may evict heavily used pages. LRU addresses this by tracking usage recency." },
      { q: "What is a page fault and what happens in the OS when one occurs?",
        a: "A page fault is a hardware trap that occurs when a process accesses a page not currently in physical memory (valid bit = 0 in page table). OS handling: Save process state \u2192 verify the access is legal \u2192 find a free frame (or run replacement algorithm) \u2192 issue disk I/O to load the page \u2192 suspend process (do other work while waiting for I/O) \u2192 when I/O completes, update page table \u2192 restart the faulting instruction." },
    ]
  },
  { title: "Practical 10 \u2014 LRU Page Replacement", file: "lru_page.c",
    overview: "Replace the page that has NOT been USED for the longest time. Uses temporal locality: if a page hasn't been used recently, it's unlikely to be used soon. Tracks last-use timestamp for each frame.",
    algo: [
      "Maintain last_used[i] for each frame (initially -1).",
      "For each page reference at time i: if page found in frame j: update last_used[j] = i (hit).",
      "If not found (fault): find frame with minimum last_used (least recently used). Replace it. Set last_used[replace] = i.",
    ],
    formulas: [["LRU victim","frame j with minimum last_used[j]"]],
    vivaQs: [
      { q: "What is the principle of Locality of Reference? How does LRU use it?",
        a: "Locality of Reference: Programs tend to access a relatively small subset of their pages at any given time. Two types: Temporal Locality \u2014 a recently accessed location is likely to be accessed again soon (e.g., loop variables, frequently called functions). Spatial Locality \u2014 locations near recently accessed locations are likely to be accessed soon (e.g., sequential array access, sequential code execution). LRU exploits TEMPORAL locality: it keeps recently used pages (likely to be reused) and evicts pages not used recently (unlikely to be needed soon)." },
      { q: "How is LRU implemented in real operating systems?",
        a: "Exact LRU requires a timestamp for every memory access \u2014 too expensive in hardware. Real OS approximations: 1) Reference Bit: Each page table entry has a 1-bit flag. Hardware sets it to 1 when page is accessed. OS periodically clears all bits. Page with bit=0 was not recently used. 2) Additional Reference Bits: 8-bit shift register per page; OS shifts in reference bit periodically. Lowest binary value = LRU. 3) Clock Algorithm (Second-Chance): Circular queue of frames. When replacement needed, check reference bit: if 1, clear it and skip (give second chance); if 0, replace. Very efficient approximation." },
      { q: "Why doesn't LRU suffer from Belady's Anomaly?",
        a: "LRU is a stack algorithm: the set of pages in memory with n+1 frames is always a SUPERSET of the set with n frames (for the same reference string). This property means adding more frames can only keep MORE pages in memory \u2014 it can never cause more faults. FIFO does not have this property \u2014 the sets can be completely different with different frame counts, which is why Belady\u2019s anomaly can occur." },
    ]
  },
  { title: "Practical 11 \u2014 Optimal Page Replacement", file: "optimal_page.c",
    overview: "On a page fault, replace the page that will NOT be USED for the LONGEST time in the future (look at the entire future reference string). Achieves the theoretical minimum page faults.",
    algo: [
      "On a page fault with no empty frame:",
      "For each page currently in a frame, look ahead in the remaining reference string.",
      "Find the NEXT occurrence of each page. If a page never appears again, its next_use = infinity.",
      "Replace the page with the MAXIMUM next_use (used farthest in future, or never).",
    ],
    formulas: [["next_use[j]","Index of next occurrence of frame[j] in reference string after current position; infinity if none"]],
    vivaQs: [
      { q: "Why is Optimal also called OPT or MIN?",
        a: "It achieves the MINIMUM possible number of page faults for any page replacement algorithm given the same reference string and number of frames. No algorithm can do better. It was proven by Belady (1966) that replacing the page with the longest time to next use minimizes total page faults. Hence: OPT = MIN." },
      { q: "If Optimal is the best, why don't we use it in real operating systems?",
        a: "Optimal requires complete knowledge of the FUTURE reference string \u2014 i.e., every page that will be accessed in the future and in what order. This is impossible at runtime (the OS cannot predict what a process will do in the future). It is used only for BENCHMARKING: run a workload, record the reference string, then compute Optimal's page faults offline to establish a lower bound. If your real algorithm is close to Optimal, it\u2019s performing well." },
    ]
  },
  { title: "Practical 12 \u2014 Paging Technique", file: "paging.c",
    overview: "Demonstrates logical-to-physical address translation using a page table. User provides a page table (logical page -> physical frame mapping) and logical addresses. The program computes the physical address.",
    algo: [
      "Physical memory divided into fixed-size frames. Logical memory divided into equal-size pages.",
      "Page Table stores: page_table[page_no] = frame_no.",
      "For logical address L: page_no = L / page_size (integer division), offset = L % page_size.",
      "Physical address = page_table[page_no] * page_size + offset.",
    ],
    formulas: [["Page Number","Logical Address / Page Size"],["Offset","Logical Address % Page Size"],["Physical Address","frame_no * page_size + offset"]],
    vivaQs: [
      { q: "Does Paging cause internal or external fragmentation? Explain both clearly.",
        a: "External Fragmentation: NO. Paging completely eliminates external fragmentation. Since any free frame in physical memory can hold any page, free frames are ALWAYS usable regardless of where they are in physical memory. There are no 'holes too small to fit a page' \u2014 all frames are exactly the same size as pages. Internal Fragmentation: YES. The last page of a process is rarely a full page. If a process needs 13KB and page size = 4KB: it needs ceil(13/4) = 4 pages = 16KB allocated, but only 13KB used. The last frame has 3KB of internal fragmentation (wasted space INSIDE the allocated frame). Average internal fragmentation = half a page per process." },
      { q: "What is the role of frames in physical memory (RAM)?",
        a: "Physical RAM is divided into equal-sized partitions called FRAMES (same size as pages). Each frame can hold exactly ONE page at a time. The OS maintains a frame table (global data structure) tracking which frames are free and which are occupied (and by which process/page). When a process needs a new page in memory, the OS finds a free frame, loads the page into that frame, and records the frame number in the process\u2019s page table. Key point: frames from different processes can be interleaved randomly in physical memory \u2014 paging allows completely non-contiguous physical allocation while maintaining a contiguous logical address space for each process." },
      { q: "What is the page table size problem and how is it solved?",
        a: "For a 32-bit system with page size 4KB: logical address space = 2^32 bytes, number of pages = 2^32 / 2^12 = 2^20 = ~1 million pages. If each page table entry = 4 bytes, page table size = 4MB per process. With 100 processes: 400MB just for page tables! Solutions: 1) Multi-level Paging: Page table itself is paged (page directory -> page table -> page). Only parts of the page table that are in use need to be in memory. 2) Inverted Page Table: One entry per FRAME (not per page). Indexed by frame number. Much smaller but slower lookup. 3) Hashed Page Table: Hash the page number; good for sparse address spaces. 4) TLB caching: Avoids most page table accesses for commonly used pages." },
      { q: "What is the difference between a page and a frame?",
        a: "Page: A fixed-size block of LOGICAL (virtual) address space belonging to a process. Pages are numbered 0, 1, 2, ... in the process's logical view. Frame: A fixed-size block of PHYSICAL memory (RAM). Frames are numbered 0, 1, 2, ... across all of physical memory. Same size: page size = frame size (e.g., 4KB). Mapping: The page table maps each page number to a frame number. Multiple processes each have their own page table, but all share the same physical frames (different frames assigned to different processes)." },
    ]
  },
  { title: "Practical 13 \u2014 FCFS Disk Scheduling", file: "disk_fcfs.c",
    overview: "Disk requests are serviced in the exact order they appear in the request queue, regardless of the current head position. Simplest disk scheduling algorithm.",
    algo: [
      "Start at initial head position.",
      "For each request in queue order: move = |current - req[i]|. total += move. cur = req[i].",
      "Total head movement = sum of all moves.",
    ],
    formulas: [["Total Movement","Sum of |req[i] - req[i-1]| for all consecutive pairs (starting from head)"]],
    vivaQs: [
      { q: "Why is FCFS the worst disk scheduling algorithm in terms of performance?",
        a: "FCFS completely ignores the current head position. The head may jump from cylinder 50 to cylinder 180 to cylinder 30 to cylinder 150, traversing the entire disk multiple times for no reason. There is no attempt to minimize seek distance. In a busy system with many pending requests, this causes very high total head movement and long average seek times. The only advantage is simplicity and guaranteed no starvation." },
      { q: "In what scenarios is FCFS acceptable?",
        a: "FCFS is acceptable when: 1) Disk load is very light (few pending requests, so optimal ordering doesn't matter much). 2) All requests are for sequential files (already in order). 3) Fairness is absolutely critical and simplicity is preferred over efficiency. 4) In flash-based SSDs where seek time is negligible (no moving parts), FCFS is perfectly fine since there is no mechanical arm to move." },
    ]
  },
  { title: "Practical 14 \u2014 SSTF Disk Scheduling", file: "disk_sstf.c",
    overview: "At each step, service the pending request CLOSEST to the current head position. Greedy algorithm that minimizes immediate seek distance at each decision point.",
    algo: [
      "At current head position: find the unserviced request with minimum |request - current|.",
      "Move to that request. Record movement. Mark as done.",
      "Repeat until all requests serviced.",
    ],
    formulas: [["Next request","argmin over unserviced requests of |req[j] - current|"]],
    vivaQs: [
      { q: "Is SSTF optimal?",
        a: "SSTF is locally optimal (makes the best choice at each step) but NOT globally optimal. Like SJF for CPU scheduling, greedily picking the nearest request at each step can lead to suboptimal total movement. The global optimum requires solving the Travelling Salesman Problem variant for disk scheduling, which is NP-hard. However, SSTF produces significantly better total movement than FCFS in practice." },
      { q: "How does SSTF cause starvation?",
        a: "Starvation in SSTF: Consider a continuous stream of requests near cylinder 50. If the head is at cylinder 50 and a request at cylinder 200 is pending, new requests at cylinders 45, 48, 52, 55 keep arriving. The head keeps oscillating near cylinder 50 servicing nearby requests. The request at cylinder 200 waits indefinitely because there is always a closer request. This is exactly analogous to SJF starvation of long processes." },
    ]
  },
  { title: "Practical 15 \u2014 SCAN Disk Scheduling", file: "disk_scan.c",
    overview: "The disk head moves in one direction (high or low), servicing all requests along the way. When it reaches the disk boundary (cylinder 0 or max), it reverses direction. Like an elevator.",
    algo: [
      "Sort requests. Split into left[] (< head) and right[] (>= head).",
      "If direction = high: service right[] in ascending order, travel to disk end (disk_size-1), then service left[] in descending order.",
      "If direction = low: service left[] in descending order, travel to 0, then service right[] in ascending order.",
      "Total movement includes travel to disk boundary.",
    ],
    formulas: [["Total Movement","Sum of each step including travel to disk end"]],
    vivaQs: [
      { q: "Why does SCAN cause unequal waiting times for different cylinder positions?",
        a: "In SCAN, cylinders in the MIDDLE of the disk are served roughly twice as often as cylinders at the EDGES. When the head sweeps left to right, it visits the middle cylinders on the way out and again on the way back. Cylinders at the extremes wait for the full sweep before being visited again. This unequal service distribution motivated C-SCAN, which always approaches from the same direction, giving more uniform wait times." },
      { q: "What is the difference between SCAN and LOOK?",
        a: "SCAN: Head travels all the way to the disk BOUNDARY (cylinder 0 or max) before reversing, even if there are no requests at the boundary. LOOK: Head only travels to the LAST REQUEST in each direction before reversing. It does not go all the way to the physical disk boundary. LOOK is more efficient \u2014 it saves unnecessary travel when requests don't extend to disk boundaries. Both have similar algorithms except for this boundary behavior." },
    ]
  },
  { title: "Practical 16 \u2014 C-SCAN Disk Scheduling", file: "disk_cscan.c",
    overview: "Head sweeps in ONE direction only (upward), servicing requests. When it reaches the disk end, it JUMPS back to cylinder 0 WITHOUT servicing requests on the return, then sweeps upward again. Treats disk as circular.",
    algo: [
      "Sort requests. Split into left[] and right[] relative to head.",
      "Service right[] in ascending order (moving toward higher cylinders).",
      "Reach disk end (disk_size-1): add movement to disk end.",
      "Jump to cylinder 0 (count jump as movement). Service left[] in ascending order.",
    ],
    formulas: [["Jump cost","counted as disk_size - 1 movement (full jump from end to 0)"]],
    vivaQs: [
      { q: "Why does C-SCAN provide more uniform waiting time than SCAN?",
        a: "In SCAN, cylinders at the high end wait for the head to travel from low to high, then reverse and come back. Cylinders at the low end wait for the downward sweep. The waiting time is non-uniform. In C-SCAN, the head always approaches requests from the SAME direction (low to high). Every request waits at most one full sweep before being served. The circular behavior ensures uniform maximum waiting time: any request waits at most the time for one full disk sweep." },
      { q: "What is the difference between C-SCAN and C-LOOK?",
        a: "C-SCAN: After servicing rightmost request, travels all the way to disk end (cylinder max), then jumps to cylinder 0 (start). C-LOOK: After servicing rightmost request, jumps directly to the smallest PENDING request (not cylinder 0). C-LOOK is more efficient \u2014 it avoids traveling to cylinder 0 if the smallest pending request is at cylinder 50. The jump in C-LOOK is smaller than in C-SCAN." },
    ]
  },
  { title: "Practical 17 \u2014 LOOK Disk Scheduling", file: "disk_look.c",
    overview: "Like SCAN, but the head only travels as far as the LAST REQUEST in each direction. Does not travel to disk boundaries. More efficient than SCAN.",
    algo: [
      "Sort. Split into left[] and right[].",
      "If direction = high: service right[] ascending, then left[] descending (no disk-end travel).",
      "If direction = low: service left[] descending, then right[] ascending (no cylinder-0 travel).",
    ],
    formulas: [["Key difference from SCAN","No travel to disk boundaries; reversal at last request position"]],
    vivaQs: [
      { q: "How much efficiency does LOOK gain over SCAN?",
        a: "LOOK gains efficiency equal to the distance between the last request in each direction and the corresponding disk boundary. For example: disk size = 200 cylinders. Rightmost request at cylinder 150. Head traveling to 150 instead of 199 saves 49 cylinder-widths of seek time per direction. In a system with heavy load concentrated in the middle cylinders, LOOK can save significant seek time compared to SCAN." },
    ]
  },
  { title: "Practical 18 \u2014 C-LOOK Disk Scheduling", file: "disk_clook.c",
    overview: "Like C-SCAN, but the head only sweeps to the LAST REQUEST (not disk end), then jumps to the SMALLEST PENDING REQUEST (not cylinder 0). Most efficient of the SCAN family.",
    algo: [
      "Sort. Split into left[] and right[].",
      "Service right[] in ascending order.",
      "Jump from rightmost request directly to left[0] (smallest left request). Count this as movement.",
      "Service left[] in ascending order.",
    ],
    formulas: [["Jump in C-LOOK","from right[rc-1] to left[0] (not from disk_end to 0)"]],
    vivaQs: [
      { q: "Rank all six disk scheduling algorithms from best to worst and explain when each is used.",
        a: "For uniform random loads on traditional HDDs: C-LOOK \u2248 LOOK (best average movement, efficient) > C-SCAN > SCAN (good, no starvation) > SSTF (good avg but starvation risk) > FCFS (worst). When to use: FCFS \u2014 light load, SSD (no seek), fairness critical. SSTF \u2014 clustered requests, throughput-critical. SCAN/LOOK \u2014 moderate uniform load. C-SCAN/C-LOOK \u2014 heavy load requiring uniform service times. SSDs: FCFS or simple queuing (seek time \u2248 0, so optimization yields little benefit)." },
      { q: "How does disk scheduling change for SSDs (Solid State Drives)?",
        a: "SSDs have NO moving parts \u2014 no mechanical arm, no spinning platters. Access time is uniform regardless of which location is accessed (no seek time, no rotational latency). Therefore, disk scheduling algorithms like SCAN, LOOK, SSTF etc. provide NO benefit for SSDs. Simple FCFS or deadline scheduling is sufficient. SSDs introduce different concerns: write amplification, wear leveling (writes must be distributed evenly across flash cells to prevent early wear), garbage collection." },
    ]
  },
  { title: "Practical 19 \u2014 Producer-Consumer Problem (POSIX Semaphores)", file: "producer_consumer.c",
    overview: "Classic IPC synchronization problem. A producer thread generates items into a shared circular buffer; a consumer thread removes them. Three semaphores prevent race conditions, overflow, and underflow.",
    algo: [
      "Shared buffer of size N. Semaphores: mutex=1 (mutual exclusion), empty=N (free slots), full=0 (filled slots).",
      "Producer: wait(empty) \u2192 wait(mutex) \u2192 buffer[in] = item; in=(in+1)%N \u2192 signal(mutex) \u2192 signal(full).",
      "Consumer: wait(full) \u2192 wait(mutex) \u2192 item = buffer[out]; out=(out+1)%N \u2192 signal(mutex) \u2192 signal(empty).",
      "Compile: gcc producer_consumer.c -o pc -lpthread (Linux only, POSIX semaphores).",
    ],
    formulas: [["Semaphore invariant","0 \u2264 empty + full \u2264 N at all times"],["Mutex invariant","mutex \u2208 {0,1} at all times"]],
    vivaQs: [
      { q: "What would happen if we used only one semaphore (mutex) without empty and full?",
        a: "Without empty semaphore: Producer would write to a full buffer (overwriting unconsumed items) \u2014 data loss. Without full semaphore: Consumer would read from an empty buffer (reading garbage/previously consumed items) \u2014 incorrect data. The empty and full semaphores act as CONDITION variables \u2014 they block the producer when buffer is full and block the consumer when buffer is empty, preventing both overflow and underflow. The mutex alone only prevents simultaneous access but does not prevent buffer-full or buffer-empty conditions." },
      { q: "Why must wait(mutex) come AFTER wait(empty)/wait(full) and not before?",
        a: "If a producer does wait(mutex) BEFORE wait(empty): Suppose the buffer is full. Producer acquires mutex (mutex=0). Producer then calls wait(empty) \u2014 empty=0, so producer BLOCKS while holding mutex. Consumer tries wait(mutex) \u2014 mutex=0, consumer BLOCKS. DEADLOCK: Producer waits for consumer to signal(empty), consumer waits for mutex. The correct order ensures that if the buffer is full/empty, the process blocks BEFORE acquiring the mutex, so the other process can still acquire the mutex and proceed." },
      { q: "What is the difference between a Semaphore and a Mutex in this program?",
        a: "Mutex (binary semaphore initialized to 1): Controls EXCLUSIVE ACCESS to the shared buffer. Only one thread (producer or consumer) can manipulate the buffer at a time. Acts as a lock. Counting Semaphores (empty, full): Track the COUNT of available resources (empty slots, filled slots). Used for producer-consumer COORDINATION \u2014 blocking the producer when full, blocking consumer when empty. A pure mutex cannot express 'wait until N slots are available' \u2014 only semaphores (or condition variables) can." },
      { q: "What happens if the producer produces much faster than the consumer?",
        a: "The buffer fills up. The producer calls wait(empty) and blocks (empty=0). The producer stops producing. The consumer eventually empties a slot, calls signal(empty), which wakes the producer. The producer produces one item and may block again immediately if the consumer is still slow. The buffer acts as a BOUNDED BUFFER: it smooths out speed differences between producer and consumer up to N items. If producer is ALWAYS faster, the buffer just stays nearly full and producer is frequently blocked." },
    ]
  },
  { title: "Practical 20 \u2014 Banker\u2019s Algorithm (Deadlock Avoidance)", file: "bankers.c",
    overview: "Dijkstra's Banker's Algorithm determines whether a resource request can be safely granted without risking deadlock. It simulates granting the request and checks if a 'safe sequence' still exists (all processes can complete in some order).",
    algo: [
      "Input: n processes, r resource types. Read Allocation[n][r], Max[n][r], Available[r].",
      "Compute Need[i][j] = Max[i][j] - Allocation[i][j] for all i,j.",
      "Safety Algorithm: Work = Available. Finish[i] = false. Find i where Finish[i]=false AND Need[i] <= Work. Set Work += Allocation[i], Finish[i] = true, add i to safe sequence. Repeat. If all Finish = true: SAFE.",
      "If safe: print safe sequence. Else: print UNSAFE (deadlock possible).",
    ],
    formulas: [["Need[i][j]","Max[i][j] - Allocation[i][j]"],["Safety condition","Need[i] <= Work for some unfinished process i"]],
    vivaQs: [
      { q: "What is a Safe State? What is the difference between a safe state and deadlock-free?",
        a: "Safe State: A state from which the OS can guarantee that ALL processes will eventually complete, regardless of future resource requests (as long as they stay within their declared Maximum). A safe sequence P1, P2, ..., Pn exists such that for each Pi, the resources it needs can be fulfilled by current Available + resources held by all Pj (j < i). Deadlock-Free vs Safe: A system can be DEADLOCK-FREE but UNSAFE. Example: All processes currently have what they need (no deadlock now), but if they request their remaining maximum resources, deadlock will occur (unsafe). Banker\u2019s keeps the system in a safe state \u2014 a stronger guarantee than merely deadlock-free." },
      { q: "Explain the Resource-Request Algorithm step by step.",
        a: "When process Pi requests Resources[]: Step 1: Check Request[i] <= Need[i]. If not: error (process exceeds its declared maximum). Step 2: Check Request[i] <= Available. If not: Pi must wait (resources not available). Step 3: Tentatively allocate: Available = Available - Request[i], Allocation[i] = Allocation[i] + Request[i], Need[i] = Need[i] - Request[i]. Step 4: Run Safety Algorithm. Step 5: If safe \u2014 commit allocation permanently. If unsafe \u2014 ROLLBACK all three changes in step 3. Pi must wait." },
      { q: "What are the limitations of the Banker\u2019s Algorithm?",
        a: "1) Maximum resource declaration: Each process must declare its maximum resource needs upfront. In real systems, this is often unknown (e.g., a web server doesn\u2019t know how many connections it will handle). 2) Fixed number of processes and resources: The algorithm assumes n and r are fixed. Real systems have processes creating and terminating dynamically. 3) Overhead: Safety algorithm runs in O(n^2 * r) for every resource request \u2014 expensive for large systems. 4) No guarantee it\u2019s practical: Even if a state is safe, it may still take very long for all processes to complete. 5) Preemption: The algorithm assumes resources are not preempted, which may not hold." },
      { q: "What does the Need matrix represent and why is it critical?",
        a: "Need[i][j] represents the REMAINING resource need of process Pi for resource type j: the additional amount it may still request before completing. Need = Max - Allocation. It is critical because: 1) It determines whether a state is safe (safety algorithm checks Need[i] <= Work). 2) It validates resource requests (Request[i] must be <= Need[i] \u2014 a process can\u2019t request more than its declared maximum). 3) It drives the simulation in the safety algorithm: if Pi\u2019s Need can be satisfied, we assume it runs to completion and releases its Allocation back to Work." },
    ]
  },
];

practicals.forEach(p => {
  children.push(h2(p.title));
  children.push(new Paragraph({ spacing: { before: 60, after: 60 },
    children: [new TextRun({ text: "File: ", bold: true, size: 20, font: "Arial" }),
               new TextRun({ text: p.file, size: 20, font: "Courier New", color: "444444" })] }));
  children.push(a(p.overview));
  children.push(h3("Algorithm Steps"));
  p.algo.forEach(step => children.push(bullet(step)));
  children.push(h3("Key Formulas / Facts"));
  children.push(refTable(p.formulas));
  children.push(h3("Viva Questions"));
  p.vivaQs.forEach(vq => {
    children.push(q(vq.q));
    children.push(a(vq.a));
  });
  children.push(separator());
});

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — QUICK REFERENCE
// ══════════════════════════════════════════════════════════════════════════════
children.push(pageBreak(), h1("SECTION 3 \u2014 Quick Reference"), separator());

children.push(h2("CPU Scheduling Formulas"));
children.push(refTable([
  ["Turnaround Time (TAT)","CT - AT (Completion Time minus Arrival Time)"],
  ["Waiting Time (WT)","TAT - BT (Turnaround minus Burst Time)"],
  ["Completion Time (CT)","Time when process finishes execution"],
  ["Response Time","Time from submission to FIRST execution (important for interactive)"],
  ["Average WT","Sum of all WT / n"],
  ["Average TAT","Sum of all TAT / n"],
  ["CPU Utilization","Useful CPU time / Total elapsed time (maximize, ideally >80%)"],
  ["Throughput","Completed processes / Unit time (maximize)"],
]));

children.push(h2("Memory Management Formulas"));
children.push(refTable([
  ["Page Number","Logical Address \u00f7 Page Size (integer division)"],
  ["Offset","Logical Address mod Page Size"],
  ["Physical Address","Frame Number \u00d7 Page Size + Offset"],
  ["EAT (with TLB)","α(t_TLB + t_mem) + (1-α)(t_TLB + 2\u00d7t_mem)  where α = hit ratio"],
  ["Internal Fragmentation","Allocated Frame Size - Actual Process Data in that frame"],
  ["Page Fault Rate (p)","Total Page Faults / Total References"],
  ["EAT (with page faults)","(1-p) \u00d7 t_mem + p \u00d7 page_fault_time"],
]));

children.push(h2("Disk Scheduling Terms"));
children.push(refTable([
  ["Seek Time","Time to move disk arm to target TRACK (largest, most variable component)"],
  ["Rotational Latency","Time for target SECTOR to rotate under head. Avg = (60/RPM) / 2 seconds"],
  ["Transfer Time","Time to read/write data once head is positioned (usually smallest)"],
  ["Total Access Time","Seek Time + Rotational Latency + Transfer Time"],
  ["Total Head Movement","Sum of |track differences| along the service sequence"],
]));

children.push(h2("Banker's Algorithm Matrices"));
children.push(refTable([
  ["Allocation[i][j]","Resources of type j currently held by process i"],
  ["Max[i][j]","Maximum resources of type j that process i may ever need"],
  ["Need[i][j]","Max[i][j] - Allocation[i][j] (remaining need)"],
  ["Available[j]","Free instances of resource type j"],
  ["Work (in safety algo)","Starts = Available; grows as processes complete"],
  ["Finish[i]","true when process i has received all it needs and finished"],
  ["Safe Sequence","Ordering P1..Pn where each Pi's Need <= Work at the time it runs"],
]));

children.push(h2("Semaphore Quick Reference"));
children.push(refTable([
  ["wait(S) / P(S)","Atomic: if S>0 then S--; else block process. Acquire resource."],
  ["signal(S) / V(S)","Atomic: S++; if blocked process exists, wake one. Release resource."],
  ["Binary Semaphore","Initial value 1. Used as MUTEX (mutual exclusion lock). S \u2208 {0,1}."],
  ["Counting Semaphore","Initial value N. Used for resource counting. S \u2208 {0,...,N}."],
  ["Producer-Consumer","mutex=1, empty=N (buffer slots), full=0. wait(empty) before wait(mutex)."],
  ["Deadlock in semaphores","Occurs if mutex acquired before empty/full (nested waits in wrong order)."],
]));

children.push(h2("Fragmentation Summary"));
children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2300, 2300, 2380, 2380],
  rows: [
    new TableRow({ tableHeader: true, children:
      ["Technique","Internal Frag","External Frag","Notes"].map(h =>
        new TableCell({ borders, shading: { fill: "1F5C99", type: ShadingType.CLEAR },
          width: { size: 2340, type: WidthType.DXA },
          margins: { top: 80, bottom: 80, left: 100, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20, font: "Arial", color: "FFFFFF" })] })] }))
    }),
    ...[ ["Contiguous Alloc","No","Yes","Compaction needed"],
         ["Paging","Yes (last page)","No","Fixed-size frames"],
         ["Segmentation","No","Yes","Variable segments"],
         ["Seg + Paging","Yes (last page)","No","Modern x86 approach"],
         ["Best/First/Worst Fit","Yes (inside block)","Yes","Compaction or paging needed"],
    ].map((row,i) =>
      new TableRow({ children: row.map((cell,ci) =>
        new TableCell({ borders,
          shading: { fill: i%2===0 ? "EBF3FB":"FFFFFF", type: ShadingType.CLEAR },
          width: { size: [2300,2300,2380,2380][ci], type: WidthType.DXA },
          margins: { top: 80, bottom: 80, left: 100, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: cell, size: 20, font: "Arial" })] })] }))
    }))
  ]
}));

children.push(h2("Page Replacement Comparison"));
children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1700, 2000, 1760, 1700, 2200],
  rows: [
    new TableRow({ tableHeader: true, children:
      ["Algorithm","Belady\u2019s Anomaly","Page Faults","Implementable","Notes"].map(h =>
        new TableCell({ borders, shading: { fill: "1F5C99", type: ShadingType.CLEAR },
          width: { size: h==="Notes"?2200:h==="Belady\u2019s Anomaly"?2000:h==="Algorithm"?1700:h==="Page Faults"?1760:1700, type: WidthType.DXA },
          margins: { top: 80, bottom: 80, left: 100, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 19, font: "Arial", color: "FFFFFF" })] })] }))
    }),
    ...[ ["FIFO","YES (suffers)","Highest","Yes","Simple, queue-based"],
         ["LRU","NO","Medium","Approx. only","Clock/Aging used in real OS"],
         ["Optimal","NO","Lowest","NO","Benchmark only; needs future"],
    ].map((row,i) =>
      new TableRow({ children: row.map((cell,ci) =>
        new TableCell({ borders,
          shading: { fill: i%2===0?"EBF3FB":"FFFFFF", type: ShadingType.CLEAR },
          width: { size: [1700,2000,1760,1700,2200][ci], type: WidthType.DXA },
          margins: { top: 80, bottom: 80, left: 100, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: cell, size: 19, font: "Arial" })] })] }))
    }))
  ]
}));

// ── BUILD DOC ────────────────────────────────────────────────────────────────
const doc = new Document({
  numbering: { config: [
    { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022",
        alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 640, hanging: 320 } } } }] },
  ]},
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: "1A3A5C" },
        paragraph: { spacing: { before: 480, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: "1F5C99" },
        paragraph: { spacing: { before: 320, after: 120 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: { page: {
      size: { width: 12240, height: 15840 },
      margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
    }},
    headers: { default: new Header({ children: [new Paragraph({
      alignment: AlignmentType.RIGHT,
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "2E75B6" } },
      children: [new TextRun({ text: "OS Viva Preparation \u2014 Jan-April 2026", size: 18, font: "Arial", color: "555555" })]
    })]})},
    footers: { default: new Footer({ children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: "2E75B6" } },
      children: [
        new TextRun({ text: "Page ", size: 18, font: "Arial", color: "555555" }),
        new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Arial", color: "555555" }),
        new TextRun({ text: " of ", size: 18, font: "Arial", color: "555555" }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, font: "Arial", color: "555555" }),
      ]
    })]})},
    children
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("OS_Viva_Prep_v2.docx", buf);
  console.log("Done: OS_Viva_Prep_v2.docx (" + Math.round(buf.length/1024) + " KB)");
});
