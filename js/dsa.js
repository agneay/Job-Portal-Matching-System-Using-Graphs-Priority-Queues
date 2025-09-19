// Priority Queue implementation using a binary heap
class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    push(item, priority) {
        this.heap.push({ item, priority });
        this._bubbleUp();
    }

    pop() {
        if (this.heap.length === 0) return null;
        const top = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this._sinkDown();
        }
        return top.item;
    }

    _bubbleUp() {
        let idx = this.heap.length - 1;
        const element = this.heap[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.heap[parentIdx];
            if (element.priority <= parent.priority) break;
            this.heap[parentIdx] = element;
            this.heap[idx] = parent;
            idx = parentIdx;
        }
    }

    _sinkDown() {
        let idx = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            let leftIdx = 2 * idx + 1;
            let rightIdx = 2 * idx + 2;
            let swap = null;

            if (leftIdx < length) {
                if (this.heap[leftIdx].priority > element.priority) {
                    swap = leftIdx;
                }
            }

            if (rightIdx < length) {
                if (
                    (swap === null && this.heap[rightIdx].priority > element.priority) ||
                    (swap !== null && this.heap[rightIdx].priority > this.heap[swap].priority)
                ) {
                    swap = rightIdx;
                }
            }

            if (swap === null) break;
            this.heap[idx] = this.heap[swap];
            this.heap[swap] = element;
            idx = swap;
        }
    }
}

// DSA Matching System
function calculateScore(candidate, job) {
    const skillMatch = candidate.skills.filter(s => job.requiredSkills.includes(s)).length / job.requiredSkills.length;
    const expScore = Math.min(candidate.experience / job.minExperience, 1);
    const salaryGap = Math.max(candidate.expectedSalary - job.maxSalary, 0);
    const salaryGapScore = salaryGap > 0 ? 1 : 0;

    return (skillMatch * 0.6) + (expScore * 0.3) - (salaryGapScore * 0.1);
}

function runMatching(candidates, jobs) {
    let results = [];
    jobs.sort((a, b) => b.priority - a.priority);

    for (let job of jobs) {
        let pq = new PriorityQueue();
        for (let candidate of candidates) {
            if (!candidate.assigned) {
                const score = calculateScore(candidate, job);
                if (score > 0) {
                    pq.push(candidate, score);
                }
            }
        }

        let openings = job.openings;
        while (openings > 0) {
            let candidate = pq.pop();
            if (!candidate) break;
            candidate.assigned = true;
            results.push({ candidate: candidate.name, job: job.title });
            openings--;
        }
    }
    return results;
}

// Export function for app.js
window.runMatching = runMatching;