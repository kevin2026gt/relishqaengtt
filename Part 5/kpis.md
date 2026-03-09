Consider the following situation: your team runs an automated regression suite of 200 tests nightly. Over
the past two weeks, the results have been:

| Night | Total | Passed | Failed | Skipped | Avg Duration |
|-------|-------|--------|--------|---------|--------------|
|Mon W1 |  200  |  178   |   18   |    4    |   12m 30s    |
|Tue W1 |  200  |  180   |   16   |    4    |   12m 45s    |
|Wed W1 |  200  |  165   |   31   |    4    |   14m 10s    |
|Thu W1 |  200  |  170   |   26   |    4    |   13m 55s    |
|Fri W1 |  200  |  182   |   14   |    4    |   12m 20s    |
|Mon W2 |  200  |  175   |   21   |    4    |   13m 05s    |
|Tue W2 |  200  |  160   |   36   |    4    |   15m 30s    |
|Wed W2 |  200  |  158   |   38   |    4    |   16m 00s    |
|Thu W2 |  200  |  162   |   34   |    4    |   15m 40s    |
|Fri W2 |  200  |  155   |   41   |    4    |   16m 20s    |

Based on this data:
1. Question1 - Identify the trend — What is happening to the suite's reliability over these two weeks? 

**Answer:**
The test suite is experiencing a **deteriorating reliability trend** over the two-week period:

- **Pass Rate Decline:** Week 1 average pass rate was 87.4% (874/1000 tests), while Week 2 dropped to 81% (810/1000 tests) — a 6.4% decline
- **Increasing Failures:** Failed tests increased from an average of 21 per night in Week 1 to 34 per night in Week 2 (62% increase)
  - Week 1 failures: 18, 16, 31, 26, 14 (range: 14-31)
  - Week 2 failures: 21, 36, 38, 34, 41 (range: 21-41, trending upward)
- **Suite Duration Growing:** Average runtime increased from 13m08s (Week 1) to 15m23s (Week 2) — a 2m15s increase (17% slower)
- **Consistency Issues:** Week 2 shows consistently higher failure rates, with the worst performance on Friday of Week 2 (77.5% pass rate, 41 failures, 16m20s duration)

**Conclusion:** The test suite's reliability is degrading significantly, requiring immediate investigation and remediation.

---

2. **Propose three KPIs that you would track to monitor and improve this suite's health.**

### **KPI 1: Pass Rate (Reliability)**

**Calculation:**
- Formula: `(Total Passed Tests / Total Tests Run) × 100`
- Example: Monday W1 = (178 / 200) × 100 = 89%

**Threshold/Target:**
- **Green (Healthy):** ≥ 95% pass rate
- **Yellow (Warning):** 85-94% pass rate
- **Red (Critical):** < 85% pass rate
- Current state: 81% average in Week 2 is in Red zone

**Action on Breach:**
- **Yellow threshold breach:** Schedule team meeting to investigate recent code changes and test failures; increase monitoring frequency
- **Red threshold breach:** STOP production deployments immediately; assign senior engineer to debug root cause; run post-mortem on all failed tests; consider rollback of recent changes

---

### **KPI 2: Test Execution Duration (Performance)**

**Calculation:**
- Formula: `Average of all test runs in the defined period (daily/weekly)`
- Trend analysis: Compare week-over-week or day-over-day changes
- Example: Week 1 avg = (12m30s + 12m45s + 14m10s + 13m55s + 12m20s) / 5 = 13m08s

**Threshold/Target:**
- **Target:** ≤ 12m 30s (maintain baseline)
- **Warning:** 12m 30s - 14m 00s (10% over baseline)
- **Critical:** > 14m 00s (15% over baseline)
- Current state: Week 2 average of 15m23s exceeds critical threshold

**Action on Breach:**
- **Warning threshold:** Analyze test execution logs for slow tests; identify resource bottlenecks; profile database queries
- **Critical threshold:** Escalate to DevOps; check server resources (CPU, memory, I/O); identify tests with timeouts; consider parallelizing slow tests or increasing timeout limits

---

### **KPI 3: Failure Rate Trend (Stability)**

**Calculation:**
- Formula: `(Current Week Avg Failures - Previous Week Avg Failures) / Previous Week Avg Failures × 100`
- Track both absolute failure count and trend velocity
- Example: (34 failures W2 - 21 failures W1) / 21 × 100 = +62% increase

**Threshold/Target:**
- **Target:** ≤ 5% week-over-week change (stable)
- **Yellow:** 5-20% increase in failures
- **Red:** > 20% increase in failures OR consecutive days with rising failure count
- Current state: +62% increase is severe Red alert

**Action on Breach:**
- **Yellow threshold:** Review recent commits for flaky test patterns; check if new tests were added; investigate external dependencies (APIs, databases)
- **Red threshold:** EMERGENCY: Pause new feature deployments; revert recent code changes; run git bisect to identify breaking commit; execute full regression analysis; notify stakeholders of suite instability

---

3. **Root cause hypothesis — What are the two most likely explanations for this trend?**

### **Hypothesis 1: Recent Code Changes Introduced Bugs/Instability**

**Why this is likely:**
- The decline starts mid-Week 1 (Wednesday with 31 failures) and accelerates through Week 2
- Suggests a deployable code change that broke functionality rather than infrastructure issues
- Pass rate degradation correlates with increased failure count, not random intermittent failures

**Investigation Steps:**
1. **Git Log Analysis:**
   - Run `git log --since="10 days ago" --oneline` to identify all commits in the past two weeks
   - Focus on commits between Monday W1 and Tuesday W2 (when failure rate spiked from 16 to 36)
   - Use `git bisect` to narrow down the breaking commit using test runs

2. **Code Review:**
   - Review all pulled PRs merged in the past 10 days
   - Check for changes to: test assertions, mocking frameworks, database fixtures, external API integrations
   - Look for race conditions, timing changes, or dependency version upgrades

3. **Test Failure Analysis:**
   - Categorize failures: Are they all in the same test module or spread across multiple areas?
   - Run individual failing tests locally vs. in CI to see if they're environment-specific
   - Check if failures are deterministic or flaky (run failed tests 5x to establish pattern)

4. **High-Risk Areas to Check:**
   - Changes to authentication/session handling
   - Database migration scripts or query optimizations
   - Updates to test framework dependencies (Jest, Mocha, Cypress, etc.)
   - Changes to test data setup/teardown logic

**Expected Timeline:** 1-2 hours to identify breaking commit via bisect

---

### **Hypothesis 2: Infrastructure/Environment Degradation**

**Why this is likely:**
- Test duration increased 17% (13m08s → 15m23s), suggesting resource contention
- Consistent upward trend through Week 2 indicates cumulative degradation (memory leaks, disk space, etc.)
- Could affect test timeouts and reliability

**Investigation Steps:**

1. **Server Resource Monitoring:**
   - Check CI/CD server metrics for the past 2 weeks: CPU usage, memory, disk I/O
   - Command: `top`, `free -h`, `df -h` on test execution server
   - Graph hourly averages to spot correlation with test times

2. **Database/External Service Health:**
   - Check database connection pool exhaustion logs
   - Monitor API response times from dependent services (auth, payment, reporting APIs)
   - Look for rate-limiting or throttling when tests run in parallel
   - Check for database locks or long-running queries: `SHOW PROCESSLIST;` (MySQL)

3. **Test Execution Environment:**
   - Check test runner logs for timeouts or resource allocation errors
   - Examine disk space on temp directories (`/tmp`, `%TEMP%`)
   - Review Docker/container resource limits if containerized
   - Check for memory leaks in test fixtures (e.g., database connections not closing properly)

4. **Network/Connectivity Issues:**
   - Check network latency to external services
   - Review firewall/proxy logs for blocked connections
   - Test VPN/tunnel connectivity if tests depend on private networks

5. **Logs to Review:**
   - CI/CD server logs: `/var/log/syslog`, Event Viewer (Windows)
   - Test framework logs for out-of-memory errors, timeout errors
   - Database server slow query logs, connection logs
   - Application server logs if tests exercise live services

**Expected Timeline:** 30 minutes to 2 hours depending on log availability

---

### **Recommended Investigation Order:**

1. **Start with Hypothesis 1 (Git Bisect)** — Takes 1-2 hours, very definitive, highest probability of quick fix
2. **Parallel: Check Infrastructure (KPIs)** — Monitor server metrics while bisecting
3. **If Hypothesis 1 fails** → Deep-dive into Hypothesis 2 with database/service analysis
4. **If both fail** → Check for flaky tests, external environment changes, or third-party service outages
 
