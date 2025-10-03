#include <iostream>
#include <vector>

bool func1(std::vector<int> vect){
    
    if(vect.size() <2){
        return false;
    }        
    for(int a = 0; a<vect.size(); ++a){
        for( int b = a+1; b < vect.size(); ++b){
            if((vect[a]*vect[b]) %12 == 0){
               
                return true;
            }
        }
    }
    return false;
}
bool func2(std::vector<int> vect){
    // a value is only divisible by 12 if its also divisible by 4 and 3 or 6 and 2
    // check if each value if divisible by 3 or by 2^2 ( two two times)
    int check2 = 0;
    bool check3 = false;
    bool check4 = false;
    bool check6 = false;
    if(vect.size() <2){
        return false;
    }

    for(int i = 0; i < vect.size(); ++i){
        // iterator of vect and 
        int elem = vect[i];
        if(elem % 12 == 0){ // always checks 12
            return true;
        }
        else{
            if (elem % 3 == 0){
                check3 = true;
            }
            if (elem %4 == 0){
                check4 = true;
            }
            if ( elem %6 ==0){
                check6 = true;
            }
            if(elem%2 == 0){
                ++check2; 
                if(check2 >= 2)check4 = true;
            }
            
            if((check4 && check3) || (check6 && check2)||(check4 && check6)){
                return true;
            }
        }
    }  
    return false; 
}
int num_comp = 0;
template <typename T> 
int Binary_Search(const std::vector<T> &v, const T &x){
    int low = 0;
    int high = static_cast<int>(v.size()) -1;
    

    while(low <= high){
       int mid = low+(high-low)/2; // middle point
        ++num_comp;
        if(v[mid] == x){
            return mid;
        }
        ++num_comp;
        if(v[mid] < x){
            low = mid +1;
        }
        else{
            high = mid -1;
        }
    }


    return -1;
}
int main(){
    // std::cout<<"hello";
    // int numiter = 0;
    // for(int a = 0; a < 4; ++a){
    //     for (int b = a; b < 4; ++a){
    //         ++numiter;
    //     }
    // }
    // std::cout<<numiter<<std::endl;

    std::vector<int> thing = {1,3,5,6,2}; 
    thing = {1 , 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048};
    thing = {1,2,3,4,5,6,7};
    std::cout<< Binary_Search(thing, 7) << " comparisons: "<<num_comp<<std::endl;
    thing = {1,1,1,1,1};
    thing = {12};
   

    bool val1 = func1(thing);
    bool val2 = func2(thing);

    switch(val2){
        case true:
            std::cout<<"it was true";
            break;
        case false:
            std::cout<<"it was false";
            break;
    }
    return 0;
}
