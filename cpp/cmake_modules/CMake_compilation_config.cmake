#---------------------------------------------------#
#     DEFINE C++ STANDARD                           #
#---------------------------------------------------#
function(DEFINE_CPP_STANDARD NAME_OF_TARGET VERSION_NUMBER)
    MESSAGE("Defined C++${VERSION_NUMBER} for target ${NAME_OF_TARGET}")
    # set c++14 as the used c++ standard for this library
    SET_PROPERTY(TARGET ${NAME_OF_TARGET} PROPERTY CXX_STANDARD ${VERSION_NUMBER})
    SET_PROPERTY(TARGET ${NAME_OF_TARGET} PROPERTY CXX_STANDARD_REQUIRED ON)
    IF(IOS)
        SET(CMAKE_CXX_FLAGS "${CMAKE_C_FLAGS} -std=c++${VERSION_NUMBER}")
        SET(CMAKE_XCODE_ATTRIBUTE_CLANG_CXX_LANGUAGE_STANDARD "c++${VERSION_NUMBER}")
    ENDIF(IOS)
endfunction()

function(DEFINE_CPP_STANDARD_AS_11 NAME_OF_TARGET)
    MESSAGE("Defined C++11 for target ${NAME_OF_TARGET}")
    # set c++14 as the used c++ standard for this library
    SET_PROPERTY(TARGET ${NAME_OF_TARGET} PROPERTY CXX_STANDARD 11)
    SET_PROPERTY(TARGET ${NAME_OF_TARGET} PROPERTY CXX_STANDARD_REQUIRED ON)
    IF(IOS)
        SET(CMAKE_CXX_FLAGS "${CMAKE_C_FLAGS} -std=c++11")
        SET(CMAKE_XCODE_ATTRIBUTE_CLANG_CXX_LANGUAGE_STANDARD "c++11")
    ENDIF(IOS)
endfunction()

function(DEFINE_CPP_STANDARD_AS_14 NAME_OF_TARGET)
    MESSAGE("Defined C++14 for target ${NAME_OF_TARGET}")
    # set c++14 as the used c++ standard for this library
    SET_PROPERTY(TARGET ${NAME_OF_TARGET} PROPERTY CXX_STANDARD 14)
    SET_PROPERTY(TARGET ${NAME_OF_TARGET} PROPERTY CXX_STANDARD_REQUIRED ON)
    IF(IOS)
        SET(CMAKE_CXX_FLAGS "${CMAKE_C_FLAGS} -std=c++14")
        SET(CMAKE_XCODE_ATTRIBUTE_CLANG_CXX_LANGUAGE_STANDARD "c++14")
    ENDIF(IOS)
endfunction()

function(DEFINE_CPP_STANDARD_AS_17 NAME_OF_TARGET)
    MESSAGE("Defined C++17 for target ${NAME_OF_TARGET}")
    # set c++17 as the used c++ standard for this library
    SET_PROPERTY(TARGET ${NAME_OF_TARGET} PROPERTY CXX_STANDARD 17)
    SET_PROPERTY(TARGET ${NAME_OF_TARGET} PROPERTY CXX_STANDARD_REQUIRED ON)
    IF(IOS)
        SET(CMAKE_CXX_FLAGS "${CMAKE_C_FLAGS} -std=c++17")
        SET(CMAKE_XCODE_ATTRIBUTE_CLANG_CXX_LANGUAGE_STANDARD "c++17")
    ENDIF(IOS)
endfunction()
