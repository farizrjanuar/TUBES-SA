def activitySelection(arr):
    # Sorting the activities in increasing order of their finish time
    arr.sort(key=lambda x: x[0])
  

    # dp[i] stores the maximum non-conflicting activities till i'th activity
    dp = [[] for _ in range(len(arr))]
    

    for i in range(len(arr)):

        for j in range(i):

            # When `arr[j][1]` (finish time of j'th activity) is less than equal to `arr[i][0]` (start time of i'th activity)
            if arr[j][1] <= arr[i][0] and len(dp[i]) < len(dp[j]):

                dp[i] = dp[j].copy()

        # Adding arr[i] to dp[i]
        dp[i].append(arr[i])


    # Finding the list having maximum size in dp
    ans = []
    for k in dp:
        if len(ans) < len(k):
            ans = k

    # Printing the list having maximum non-conflicting activities
    print(ans)

# arr storing the start and finish of all activities
#arr = [[3, 4], [2, 5], [1, 3], [5, 9], [0, 7], [11, 12], [8, 10]]
arr = [[ 9, 10],
    [10, 13],
    [10, 12],
    [11, 14],
    [11, 12],
    [11, 13],
    [12, 14],
    [12, 15],
    [12, 13],
    [12, 15],
    [13, 15],
    [13, 16],
    [14, 15],
    [14, 15],
    [14, 17],
    [15, 16],
    [15, 17],
    [16, 19],
    [16, 19],
    [16, 17]]

print('Maximum non-conflicting activities are', end=' ')
activitySelection(arr)

