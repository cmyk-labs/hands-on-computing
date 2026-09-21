/*
所属章节：34-C 扩展
演示知识点：CPython 3.12 教学扩展，非负整数加法（溢出前检查）与元组元素引用（借用转强引用）、方法表与模块初始化，错误路径保留 Python 异常
运行命令：PYTHONPATH=<扩展安装目录> python -c "import study_c_api; print(study_c_api.add_nonnegative(20, 55), study_c_api.tuple_item(('C', 'Python'), 1))"（工作目录 content/编程语言/python）
期望结果：输出 75 Python；<扩展安装目录> 为 pip --target 安装本章构建 wheel 的目录
*/
#define PY_SSIZE_T_CLEAN
#include <Python.h>
#include <limits.h>

/* 参数解析与有界算术。 */
static PyObject *
add_nonnegative(PyObject *self, PyObject *args)
{
    long left;
    long right;
    (void)self;

    if (!PyArg_ParseTuple(args, "ll:add_nonnegative", &left, &right)) {
        return NULL;
    }
    if (left < 0 || right < 0) {
        PyErr_SetString(PyExc_ValueError, "values must be nonnegative");
        return NULL;
    }
    /* 先比较余量，不能先计算可能溢出的 left + right。 */
    if (left > LONG_MAX - right) {
        PyErr_SetString(PyExc_OverflowError, "sum exceeds C long");
        return NULL;
    }
    return PyLong_FromLong(left + right);
}

/* 从借用引用取得可返回的新强引用。 */
static PyObject *
tuple_item(PyObject *self, PyObject *args)
{
    PyObject *items;
    PyObject *item;
    Py_ssize_t index;
    (void)self;

    if (!PyArg_ParseTuple(args, "O!n:tuple_item",
                          &PyTuple_Type, &items, &index)) {
        return NULL;
    }
    item = PyTuple_GetItem(items, index);
    if (item == NULL) {
        return NULL;
    }
    /* items 与 item 都是借用引用；本函数不 DECREF 它们。 */
    return Py_NewRef(item);
}

/* 将 Python 名称、C 函数与调用约定连接起来。 */
static PyMethodDef methods[] = {
    {"add_nonnegative", add_nonnegative, METH_VARARGS,
     "Add two nonnegative indexable integers within C long range."},
    {"tuple_item", tuple_item, METH_VARARGS,
     "Return the same tuple item at a nonnegative index."},
    {NULL, NULL, 0, NULL}
};

static struct PyModuleDef module_definition = {
    PyModuleDef_HEAD_INIT,
    "study_c_api",
    "Minimal CPython 3.12 C API examples.",
    -1,
    methods,
    NULL,
    NULL,
    NULL,
    NULL
};

/* 初始化中各条退出路径都交代已取得的强引用。 */
PyMODINIT_FUNC
PyInit_study_c_api(void)
{
    PyObject *module = PyModule_Create(&module_definition);
    PyObject *limit;
    if (module == NULL) {
        return NULL;
    }

    limit = PyLong_FromLong(LONG_MAX);
    if (limit == NULL) {
        Py_DECREF(module);
        return NULL;
    }
    /* AddObjectRef 不窃取 limit；无论成功与否都释放本地所有权。 */
    int status = PyModule_AddObjectRef(module, "LONG_MAX", limit);
    Py_DECREF(limit);
    if (status < 0) {
        Py_DECREF(module);
        return NULL;
    }
    return module;
}
