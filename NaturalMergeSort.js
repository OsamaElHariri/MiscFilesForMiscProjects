var num = [34,56,67,78,98,75,534,34,1,54,65,76,76,98,98,7,76,654,54,334,0];

//Delays code execution
function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}


//swaps two elements in an array, takes the indexes as params
function swap(a, one,two){
    var temp = a[one];
    a[one] = a[two];
    a[two] = temp;
}

//reverse a section of an array
function rev(a, start, end){
    var length = (end - start);
    for(var i = 0;i< length/2; i++){
        swap(a, start+i, end - i);
    }
}

//Check if an element at an index, and the element after it are in ascending order
function checkAscending(a, index){
    if(index+1 > a.length){
        return true;
    }
    return (a[index] <= a[index+1]);
}

//Returns an int,call it x, such that index -> x are sorted. If the section is not in ascending order, reverse it
function getSection(a, index){
    var ascending = checkAscending(a,index);
    var endOfSection = index;
    if(ascending){
        while(endOfSection+1< a.length &&  a[endOfSection]<= a[endOfSection+1]){
            endOfSection++;
        }
        return endOfSection;
    }//else
    while(endOfSection+1< a.length &&  a[endOfSection]>=a[endOfSection+1]){
        endOfSection++;
    }
    rev(a,index, endOfSection);
    return endOfSection;

}

//Merge two sections of an array
function merge(a, start ,mid ,end){
    var prevMid = mid, prevStart = start;
    var temp = [];
    while(start <prevMid && mid <= end){
        while(a[start]<=a[mid] && start <prevMid ){
            temp.push(a[start]);
            start++;
        }
        //a[start] < a[mid]

        while(a[start]>a[mid] && mid <= end){
            temp.push(a[mid]);
            mid++;
        }
        //a[mid]<= a[start]
    }
    //Put the remaining elements in the temp array
    while(mid<end){
        temp.push(a[mid]);
        mid++;
    }
    while(start<prevMid){
        temp.push(a[start]);
        start++;
    }

    //Copy temp onto passed array
    var counter = prevStart;
    for(var i = 0; i <temp.length;i++){
        a[counter] = temp[i];
        counter++;
    }
}

//Natural Merge sort
function naturalMergeSort(a, begin, finish){
    var start= begin,mid = start ,end = start;

    //If start == begin and mid == finish, then the entire array is one section, which means it is sorted
    while(start > begin || mid < finish){
        start= begin,mid = start ,end = start;
        while(end < finish && mid < finish){
            mid = getSection(a, start);

            //if mid >= a.length-1, then the number of sections was odd and the last section is to be merged with nothing
            if(mid >=(a.length-1)) break;

            end = getSection(a, mid+1);

            //At this point, a[start->mid] = sorted in ascending order, and a[mid+1 -> end] is sorted in ascending order
            merge(a, start, mid+1, end);
            //a[start -> end] is sorted
            end++;
            start = end;
            mid=start;

        }

    }

}

naturalMergeSort(num, 0, num.length-1);
console.log("num after sorting ="+num);
