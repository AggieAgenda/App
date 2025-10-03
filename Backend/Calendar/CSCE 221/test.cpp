#include <iostream>
int main(){
    int** arr = new int*[10];
    
    //newarr[0] = arr[0];
    for (int i = 0; i < 10; ++i){
        arr[i] = new int[15];
    }
    return 0;
}